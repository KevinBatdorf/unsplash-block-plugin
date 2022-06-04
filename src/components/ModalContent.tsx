import {
    useEffect,
    useCallback,
    useRef,
    useState,
    useLayoutEffect,
} from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { useListPhotos } from '../lib/fetcher'
import { areSimiliar } from '../lib/util'
import { useGlobalState } from '../state/global'
import { ImagePosition } from '../types'
import { ButtonNav } from './ButtonNav'
import { MasonryItem } from './MasonryItem'

export const ModalContent = () => {
    const { page, loading } = useGlobalState()
    const {
        data: images,
        error,
        cacheId,
    } = useListPhotos({ per_page: 30, page })
    const [gridWidth, setGridWidth] = useState<number>()
    const [columns, setColumns] = useState<number>(3)
    const [imagePositions, setImagePositions] = useState<ImagePosition[]>([])
    const [moving, setMoving] = useState(true)
    const [subpixelOffset, setSubpixelOffset] = useState(0)
    const [minHeight, setMinHeight] = useState(0)
    const gridRef = useRef<HTMLDivElement>(null)

    // Masonry items will report back their position
    // so that othe rmasonry items can read from the data
    const setPosition = useCallback(
        (index: number, incoming: ImagePosition) => {
            if (!imagePositions[index - 1] && index !== 0) return
            // Check if the objects have the same values
            if (areSimiliar(imagePositions?.[index] ?? {}, incoming)) return

            const newPositions = [...imagePositions]
            newPositions[index] = incoming

            if (newPositions?.length === images?.length) {
                setMoving(false)
            }
            setImagePositions(newPositions)
        },
        [imagePositions, images],
    )

    useLayoutEffect(() => {
        if (!images?.length) return
        setImagePositions([])
    }, [page, images])

    // Find the height of all the images, and add some extra space
    useEffect(() => {
        if (!imagePositions?.length) return
        const largestHeight = imagePositions
            .slice(-columns)
            .reduce((prev, next) => Math.max(prev, next.y + next.height), 0)
        setMinHeight(Math.floor(largestHeight) + 100)
    }, [moving, imagePositions, columns])

    useLayoutEffect(() => {
        const events = ['resize', 'focus']
        const handler = () => {
            setMoving(true)
            setImagePositions([])
        }
        events.forEach((e) =>
            window.addEventListener(e, handler, { passive: true }),
        )
        return () => {
            events.forEach((e) => window.removeEventListener(e, handler))
        }
    })

    useEffect(() => {
        // Update the grid stats to instruct the MasonryItems to re-render
        if (imagePositions?.length) return
        if (!gridRef.current) return
        const w = Math.ceil(gridRef.current.offsetWidth)
        const columns = Math.floor(w / 300)
        setColumns(columns)
        // Fight subpixel rendering
        const realW = Math.floor(w / columns) * columns
        setSubpixelOffset(w - realW)
        setGridWidth(realW)
    }, [imagePositions])

    // Reset if we are fetching new data
    useEffect(() => {
        if (!loading) return
        setImagePositions([])
    }, [loading])

    if (error) {
        return (
            <div className="text-center absolute inset-0 flex items-center justify-center">
                {error?.message ?? __('Error', 'unlimited-photos')}
            </div>
        )
    }

    return (
        <div ref={gridRef} className="w-full relative h-full overflow-y-scroll">
            <div className="w-full relative min-h-full" style={{ minHeight }} />
            <div
                className="absolute left-0 top-0 bottom-0 bg-transparent"
                style={{ width: subpixelOffset, minHeight }}
            />
            {images?.map((image, index) => (
                <MasonryItem
                    key={image.id + cacheId}
                    index={index}
                    gridWidth={gridWidth}
                    columns={columns}
                    subpixelOffset={subpixelOffset}
                    imagePositions={imagePositions?.slice(0, index)}
                    setPosition={setPosition}
                    image={image}
                />
            ))}
            <div className="mt-2 mb-6">
                <ButtonNav show={imagePositions?.length === images?.length} />
            </div>
        </div>
    )
}
