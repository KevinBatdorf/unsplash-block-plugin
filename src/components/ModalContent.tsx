import { useEffect, useCallback, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { useListPhotos } from '../lib/fetcher'
import { areSimiliar } from '../lib/util'
import { ImagePosition } from '../types'
import { MasonryItem } from './MasonryItem'

export const ModalContent = () => {
    const [page, setPage] = useState(1)
    const { data: images, error } = useListPhotos({ per_page: 50, page })
    const [gridWidth, setGridWidth] = useState<number>()
    const [columns, setColumns] = useState<number>(3)
    const [imagePositions, setImagePositions] = useState<ImagePosition[]>([])
    const [moving, setMoving] = useState(true)
    const [subpixelOffset, setSubpixelOffset] = useState(0)
    const [minHeight, setMinHeight] = useState(0)
    const gridRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => setImagePositions([]), [page])

    useEffect(() => {
        if (moving || !imagePositions?.length) return
        const largestHeight = imagePositions
            .slice(-columns)
            .reduce((prev, next) => Math.max(prev, next.y + next.height), 0)
        setMinHeight(largestHeight)
    }, [moving, imagePositions, columns])

    useEffect(() => {
        const events = ['resize', 'focus']
        let rafId: number
        const handler = () => {
            window.cancelAnimationFrame(rafId)
            setMoving(true)
            rafId = window.requestAnimationFrame(() => setImagePositions([]))
        }
        events.forEach((e) =>
            window.addEventListener(e, handler, { passive: true }),
        )
        return () => {
            events.forEach((e) => window.removeEventListener(e, handler))
            window.cancelAnimationFrame(rafId)
            // If the frame was requested and cancelled
            if (rafId) setMoving(false)
        }
    })

    useEffect(() => {
        // Update the layout if no image positions are set
        if (imagePositions?.length) return
        updateLayout()
        const rafId2 = window.requestAnimationFrame(() => updateLayout())
        return () => window.cancelAnimationFrame(rafId2)
    }, [imagePositions])

    if (error) {
        return (
            <div className="text-center absolute inset-0 flex items-center justify-center">
                {error?.message ?? __('Error', 'unlimited-photos')}
            </div>
        )
    }

    return (
        <>
            <button
                className="fixed top-0 left-0 z-10"
                onClick={() => setPage((p) => p + 1)}>
                next page
            </button>
            <div
                ref={gridRef}
                className="w-full relative h-full overflow-y-scroll">
                <div className="w-full relative h-full" style={{ minHeight }} />
                <div
                    className="absolute left-0 top-0 bottom-0 bg-gray-300"
                    style={{ width: subpixelOffset, minHeight }}
                />
                {images?.map((image, index) => (
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
        </>
    )
}
