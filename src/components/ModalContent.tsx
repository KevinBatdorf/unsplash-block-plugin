import {
    useEffect,
    useCallback,
    useRef,
    useState,
    useLayoutEffect,
} from '@wordpress/element'
import { __, sprintf } from '@wordpress/i18n'
import classnames from 'classnames'
import { usePhotos } from '../hooks/usePhotos'
import { areSimiliar } from '../lib/util'
import { useGlobalState } from '../state/global'
import { ImagePosition, ExternalImage } from '../types'
import { ButtonNav } from './ButtonNav'
import { MasonryItem } from './MasonryItem'

type MondalContentProps = {
    setImage: (image: ExternalImage) => void
}

export const ModalContent = ({ setImage }: MondalContentProps) => {
    const { page, loading, currentTheme, imageSource } = useGlobalState()
    const {
        data: images,
        error,
        cacheId,
    } = usePhotos({ per_page: 30, page, imageSource })
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
        const isMobile = window.innerWidth < 782
        const columns = isMobile ? 1 : Math.max(Math.floor(w / 295), 2)
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

    if (
        error ||
        (!images?.length && typeof images !== 'undefined' && !loading)
    ) {
        return (
            <div
                className={classnames(
                    'text-center absolute inset-0 flex flex-col items-center justify-center unlimited-photos-image-container-error',
                    {
                        'text-white': currentTheme === 'midnight',
                        'text-gray-900': currentTheme !== 'midnight',
                    },
                )}>
                {error?.message ? (
                    <p className="mb-4">
                        {sprintf(
                            __('Error: %s', 'unlimited-photos'),
                            error?.response?.message ??
                                sprintf(
                                    __(
                                        '%s. Please wait or try again',
                                        'unlimited-photos',
                                    ),
                                    error?.message,
                                ),
                        )}
                    </p>
                ) : images && images?.length > 0 ? null : (
                    <p className="m-0">
                        {__('No photos found', 'unlimited-photos')}
                    </p>
                )}
            </div>
        )
    }

    if (loading) {
        return (
            <div
                className={classnames(
                    'text-center absolute inset-0 flex flex-col items-center justify-center unlimited-photos-image-container-error',
                    {
                        'text-white': currentTheme === 'midnight',
                        'text-gray-900': currentTheme !== 'midnight',
                    },
                )}>
                {__('Loading...', 'unlimited-photos')}
            </div>
        )
    }

    return (
        <div
            ref={gridRef}
            className="w-full relative h-full overflow-y-auto unlimited-photos-image-container">
            <div
                className="hidden md:block w-full relative min-h-full"
                style={{ minHeight }}
            />
            <div
                className="hidden md:absolute left-0 top-0 bottom-0 bg-transparent"
                style={{ width: subpixelOffset, minHeight }}
            />
            {images?.map((image, index) => (
                <MasonryItem
                    key={String(image.id) + cacheId}
                    index={index}
                    setImage={setImage}
                    gridWidth={gridWidth}
                    columns={columns}
                    subpixelOffset={subpixelOffset}
                    imagePositions={imagePositions?.slice(0, index)}
                    setPosition={setPosition}
                    image={image}
                />
            ))}
            <div className="mt-6 md:mt-2 mb-6">
                <ButtonNav show={imagePositions?.length === images?.length} />
            </div>
        </div>
    )
}
