import {
    useLayoutEffect,
    useCallback,
    useRef,
    useState,
} from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { useGlobalState } from '../state/global'
import { ImagePosition, UnsplashImage } from '../types'

export const MasonryItem = ({
    image,
    subpixelOffset,
    imagePositions,
    setPosition,
    index,
    columns,
    gridWidth,
    setImage,
}: {
    image: UnsplashImage
    imagePositions: ImagePosition[]
    setPosition: (index: number, position: ImagePosition) => void
    index: number
    columns: number
    subpixelOffset: number
    gridWidth: number | undefined
    setImage: (image: UnsplashImage) => void
}) => {
    const [x, setX] = useState<number>()
    const [y, setY] = useState<number>()
    const [width, setWidth] = useState<number>()
    const [height, setHeight] = useState<number>()
    const [parent, setParent] = useState<undefined | ImagePosition>()
    const canUpdate = useRef(true)
    const { importing, setImporting } = useGlobalState()
    const [isImporting, setIsImporting] = useState(false)

    // Searches the data to find the best match placement area
    // Looks for the shorest height
    const findParent = useCallback(() => {
        // Top n images have no parent
        if (imagePositions?.length < columns) return undefined

        // Remove any that are already parents
        const alreadyParents = imagePositions
            .filter((i) => Boolean(i?.parent))
            .map((i) => ({ ...i.parent }))

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
        return { ...bestMatch }
    }, [imagePositions, columns])

    // Only update if the grid changes
    useLayoutEffect(() => {
        if (gridWidth && gridWidth > 0) canUpdate.current = true
    }, [gridWidth, subpixelOffset])

    // Calculate the position of the image
    useLayoutEffect(() => {
        // Always allow index 0 and only allow if the previous image was set
        if (imagePositions?.length < index && index !== 0) return
        if (!gridWidth || !canUpdate.current) return
        canUpdate.current = false

        // Find the best match for a parent
        const parent = findParent()
        // Remove image.parent.parent.etc
        if (parent) delete parent.parent
        setParent(parent)

        const w = gridWidth / columns
        const h = Math.floor((w * image.height) / image.width)
        const newX =
            parent?.x ??
            Math.max(Math.ceil((index / columns) * gridWidth), 0) +
                subpixelOffset
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

    // Signal to the parent comonent the details of our position
    useLayoutEffect(() => {
        if (!width || !height) return
        if (typeof x === 'undefined' || typeof y === 'undefined') return
        const rafId = requestAnimationFrame(() => {
            setPosition(index, { x, y, width, height, parent })
        })
        return () => {
            cancelAnimationFrame(rafId)
        }
    }, [x, y, width, height, index, setPosition, parent])

    // Wait until all are not undefined
    if ([x, y, width, height].some((i) => typeof i === 'undefined')) return null
    if (!gridWidth) return null

    // TODO: use a variant to transition into full view?

    const mobilePosition = {
        x: 0,
        y: 0,
        width,
        height,
    }

    return (
        <motion.div
            className="relative md:absolute top-0 left-0"
            transition={{ type: 'Tween' }}
            animate={
                columns > 1
                    ? { x, y, width, height, opacity: 1 }
                    : mobilePosition
            }
            initial={
                columns > 1
                    ? { x, y, width, height, opacity: 0.7 }
                    : mobilePosition
            }>
            <div
                role="button"
                onClick={() => {
                    importing || setIsImporting(true)
                    setImage(image)
                    setImporting(__('Importing image...', 'unlimited-photos'))
                }}
                onKeyDown={(event) => {
                    if (['Enter', 'Space', ' '].includes(event.key)) {
                        event.stopPropagation()
                        event.preventDefault()
                        importing || setIsImporting(true)
                        setImporting(
                            __('Importing image...', 'unlimited-photos'),
                        )
                        setImage(image)
                    }
                }}
                tabIndex={0}
                aira-label={__('Press to import', 'unlimited-photos')}
                className={classnames('group', {
                    'cursor-pointer': !importing && !isImporting,
                })}>
                <img
                    className="w-full block transition duration-200"
                    alt={image?.alt_description ?? ''}
                    src={image.urls.small}
                />
                <div
                    style={{
                        background:
                            'radial-gradient(100% 65px at left bottom, rgba(0, 0, 0, 0.59) 0px, rgba(255, 255, 255, 0))',
                    }}
                    className={classnames(
                        'absolute flex inset-0 items-end justify-start z-40 bg-opacity-80 opacity-0 transition duration-300 ease-in-out',
                        {
                            'group-focus:opacity-100 group-hover:opacity-100':
                                !isImporting && !importing,
                            'opacity-100':
                                (isImporting && importing) || columns === 1,
                        },
                    )}>
                    {importing && isImporting ? (
                        <span className="p-2 font-bold text-sm text-white">
                            {importing}
                        </span>
                    ) : null}
                    {!importing ? (
                        <span className="p-2 font-bold text-sm text-white">
                            {__('Press to import', 'unlimited-photos')}
                        </span>
                    ) : null}
                </div>
            </div>
        </motion.div>
    )
}
