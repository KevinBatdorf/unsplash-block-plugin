import {
    useEffect,
    useLayoutEffect,
    useCallback,
    useRef,
    useState,
} from '@wordpress/element'
import { motion } from 'framer-motion'
import { ImagePosition, UnsplashImage } from '../types'

export const MasonryItem = ({
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
    const findParent = useCallback(() => {
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
                (i) =>
                    !alreadyParents.some((p) => p?.x === i?.x && p?.y === i?.y),
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
    }, [imagePositions, columns])

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
        const parent = findParent()
        setParent(parent)

        const w = gridWidth / columns
        const h = (w * image.height) / image.width
        const newX =
            parent?.x ??
            Math.ceil((index / columns) * gridWidth) + subpixelOffset
        const newY = parent ? Math.floor(parent.y + parent.height) : 0

        setX(newX)
        setY(newY)
        setWidth(w)
        setHeight(h)
    }, [
        findParent,
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
        let rafId: number
        const id = window.setTimeout(() => {
            rafId = requestAnimationFrame(() => {
                setPosition(index, { x, y, width, height, parent })
            })
        }, 50)
        return () => {
            window.clearTimeout(id)
            cancelAnimationFrame(rafId)
        }
    }, [x, y, width, height, index, setPosition, parent])

    // Wait until all are not undefined
    if ([x, y, width, height].some((i) => typeof i === 'undefined')) return null
    if (!gridWidth) return null
    // TODO: use a variant to transition into full view?

    return (
        <motion.div
            className="absolute top-0 left-0"
            layout
            transition={{ type: 'Tween' }}
            animate={{ x, y, width, height, opacity: 1 }}
            initial={{ x, y, width, height, opacity: 0 }}>
            <img className="w-full" alt="" src={image.urls.small} />
        </motion.div>
    )
}
