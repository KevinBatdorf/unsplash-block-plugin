import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from '@wordpress/element'
import { motion } from 'framer-motion'
import { useListPhotos } from '../hooks/fetcher'
import { UnsplashImage } from '../types'

type ImagePosition = {
    x: number
    y: number
    width: number
    height: number
    parent?: ImagePosition | undefined
}

export const ModalContent = ({ open }: { open: boolean }) => {
    const { data: images, error, isLoading } = useListPhotos({})
    const [gridWidth, setGridWidth] = useState<number>()
    const [columns, setColumns] = useState<number>(3)
    const [imagePositions, setImagePositions] = useState<ImagePosition[]>([])
    const [moving, setMoving] = useState(true)
    const [subpixelOffset, setSubpixelOffset] = useState(0)
    const gridRef = useRef<HTMLDivElement>(null)

    const setPosition = useCallback(
        (index: number, incoming: ImagePosition) => {
            if (!imagePositions[index - 1] && index !== 0) return
            // Check if the objects have the same values
            if (
                String(Object.entries(incoming).sort()) ===
                String(Object.entries(imagePositions?.[index] ?? {}).sort())
            )
                return

            const newPositions = [...imagePositions]
            newPositions[index] = incoming

            if (newPositions?.length === images?.length) {
                setMoving(false)
            }
            setImagePositions(newPositions)
        },
        [imagePositions, images],
    )
    const updateLayout = () => {
        if (!gridRef.current) return
        const w = gridRef.current.offsetWidth
        const columns = Math.floor(w / 300)
        setColumns(columns)
        // Fight subpixel rendering
        const realW = Math.floor(w / columns) * columns
        setSubpixelOffset(w - realW)
        setGridWidth(realW)
    }

    useEffect(updateLayout)

    useEffect(() => {
        let rafId: number
        let rafId2: number
        const handler = () => {
            window.cancelAnimationFrame(rafId)
            setMoving(true)
            rafId = window.requestAnimationFrame(() => {
                setImagePositions([])
                rafId2 = window.requestAnimationFrame(() => {
                    updateLayout()
                })
            })
        }
        window.addEventListener('resize', handler, { passive: true })
        return () => {
            window.removeEventListener('resize', handler)
            window.cancelAnimationFrame(rafId)
            window.cancelAnimationFrame(rafId2)
        }
    })

    return (
        <div ref={gridRef} className="w-full relative h-full overflow-y-scroll">
            {subpixelOffset ? (
                <div
                    className="absolute left-0 top-0 bottom-0 bg-gray-300"
                    style={{ width: subpixelOffset }}></div>
            ) : null}
            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center">Error: {error.message}</div>}
            {images?.slice(0, 40).map((image, index) => (
                <MasonryItem
                    key={image.id}
                    index={index}
                    gridWidth={gridWidth}
                    columns={columns}
                    subpixelOffset={subpixelOffset}
                    imagePositions={imagePositions?.slice(0, index)}
                    setPosition={setPosition}
                    image={image}
                />
            ))}
        </div>
    )
}

const findParent = (imagePositions: ImagePosition[], columns: number) => {
    // Top n images have no parent
    if (imagePositions?.length < columns) return undefined

    // Remove any that are already parents
    const alreadyParents = imagePositions
        .filter((i) => Boolean(i?.parent))
        .map((i) => i.parent)

    // Find parent candidates
    const possibleParents = imagePositions
        ?.filter(
            // If they are already a parent, remove them
            (i) => !alreadyParents.some((p) => p?.x === i?.x && p?.y === i?.y),
        )
        // Sort by distance from the top
        ?.sort((a, b) => b.y - a.y)
        // Is this even needed after all the filtering?
        ?.slice(0, columns)
    if (!possibleParents?.length) return undefined

    // Find the first image with the lowest height
    const bestMatch = possibleParents.reduce((best, next) => {
        if (next.y + next.height < best.y + best.height) {
            best = next
        }
        return best
    })
    return bestMatch
}

type MaybeUndefinedImagePosition = {
    x?: number | undefined
    y?: number | undefined
    width?: number | undefined
    height?: number | undefined
    parent?: ImagePosition | undefined
}
export const areSimiliar = (a: ImagePosition, b: MaybeUndefinedImagePosition) =>
    String(Object.entries(a).sort()) === String(Object.entries(b).sort())

const MasonryItem = ({
    image,
    subpixelOffset,
    imagePositions,
    setPosition,
    index,
    columns,
    gridWidth,
}: {
    image: UnsplashImage
    imagePositions: ImagePosition[]
    setPosition: (index: number, position: ImagePosition) => void
    index: number
    columns: number
    subpixelOffset: number
    gridWidth: number | undefined
}) => {
    const [x, setX] = useState<number>()
    const [y, setY] = useState<number>()
    const [width, setWidth] = useState<number>()
    const [height, setHeight] = useState<number>()
    const [parent, setParent] = useState<undefined | ImagePosition>()

    const canUpdate = useRef(true)

    useEffect(() => {
        if (gridWidth && gridWidth > 0) canUpdate.current = true
    }, [gridWidth])

    useEffect(() => {
        // Always allow index 0 and only allow if the previous image was set
        if (imagePositions?.length < index && index !== 0) return
        if (!gridWidth || !canUpdate.current) return
        canUpdate.current = false

        // Find the best match for a parent
        const parent = findParent(imagePositions, columns)
        setParent(parent)

        const w = gridWidth / columns
        const h = (w * image.height) / image.width
        const newX = parent?.x ?? (index / columns) * gridWidth + subpixelOffset
        const newY = parent ? parent.y + parent.height : 0

        setX(newX)
        setY(newY)
        setWidth(w)
        setHeight(h)
    }, [
        imagePositions,
        subpixelOffset,
        columns,
        gridWidth,
        index,
        image.height,
        image.width,
        width,
        x,
    ])

    useLayoutEffect(() => {
        if (!width || !height) return
        if (typeof x === 'undefined' || typeof y === 'undefined') return
        const id = window.requestAnimationFrame(() => {
            setPosition(index, { x, y, width, height, parent })
        })
        return () => window.cancelAnimationFrame(id)
    }, [x, y, width, height, index, setPosition, parent])

    // Wait until all are not undefined
    if ([x, y, width, height].some((i) => typeof i === 'undefined')) return null
    if (!gridWidth) return null

    // TODO: use a variant to transition into full view?

    return (
        <motion.div
            className="absolute"
            layout
            animate={{ x, y, width, height, opacity: 1 }}
            initial={{ x, y, width, height, opacity: 1 }}>
            <img className="w-full" alt="" src={image.urls.small} />
        </motion.div>
    )
}
