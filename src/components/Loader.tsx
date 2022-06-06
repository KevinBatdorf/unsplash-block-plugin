import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from '@wordpress/element'
import { sprintf, __ } from '@wordpress/i18n'
import { importImage } from '../lib/wp'
import { useGlobalState } from '../state/global'
import { ImageLike, UnsplashImage, WpImage } from '../types'
import { Modal } from './Modal'
import { ToolbarControls, ToolbarControlsProps } from './ToolbarControls'

type LoaderProps = {
    attributes: ImageLike
    setAttributes: (attributes: ImageLike) => void
    clientId?: string
    CurrentMenuItems?: React.ComponentType
    toolbarProps?: ToolbarControlsProps
}

export const Loader = ({
    attributes,
    setAttributes,
    clientId,
    CurrentMenuItems,
    toolbarProps,
}: LoaderProps) => {
    const [showModal, setShowModal] = useState(false)
    const { imageSize, importing, setImporting, setLoading } = useGlobalState()
    const timerRef = useRef(0)
    const rafRef = useRef(0)

    useEffect(() => {
        const namespace = 'kevinbatdorf/unlimited-photos-open'
        const open = (event: CustomEvent<{ clientId: string }>) => {
            if (event?.detail?.clientId !== clientId) return
            setShowModal(true)
        }
        window.addEventListener(namespace, open as (e: Event) => void)
        return () => {
            window.removeEventListener(namespace, open as (e: Event) => void)
        }
    }, [clientId])

    // TODO: if the user has an image set, warn them we may replace it
    // attributes?.id

    const setImage = async (image: UnsplashImage) => {
        if (importing) return
        const caption =
            image?.user?.username && image?.user?.name
                ? sprintf(
                      __('Photo by %1$s on %2$s', 'unlimited-photos'),
                      `<a href="https://unsplash.com/@${image.user.username}?utm_source=Unlimited%20Photos&utm_medium=referral">${image.user.name}</a>`,
                      '<a href="https://unsplash.com/?utm_source=Unlimited%20Photos&utm_medium=referral">Unsplash</a>',
                  )
                : ''

        // Record download to Unsplash
        await fetch('http://unsplash-api-search.vercel.app/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: image?.links?.download_location,
        })

        const newImage: WpImage | undefined = await importImage(
            image?.urls?.[imageSize],
            {
                alt: image?.alt_description ?? '',
                filename: `unsplash-image-${image.id}.jpg`,
                caption,
            },
        )
        if (!newImage) return
        const getHref = (dest: string) => {
            if (dest === 'media') return newImage?.source_url
            if (dest === 'attachment') return newImage?.link
            return attributes?.href
        }

        setAttributes({
            id: newImage.id,
            caption: newImage.caption.raw,
            linkDestination: attributes?.linkDestination ?? '',
            linkTarget: attributes?.linkTarget ?? '',
            linkClass: attributes?.linkClass ?? '',
            rel: attributes?.rel ?? '',
            href: getHref(attributes?.linkDestination ?? ''),
            url: newImage.source_url,
            alt: newImage.alt_text,
        })

        setImporting('Done!')

        timerRef.current = window.setTimeout(() => {
            rafRef.current = window.requestAnimationFrame(() => {
                setShowModal(false)
            })
        }, 1000)
    }
    useLayoutEffect(() => {
        if (showModal) {
            setLoading(false)
            setImporting(false)
        }
        window.clearTimeout(timerRef.current)
        window.clearTimeout(rafRef.current)
    }, [showModal, setImporting, setLoading])

    return (
        <>
            <ToolbarControls
                clientId={clientId}
                CurrentMenuItems={CurrentMenuItems}
                toolbarProps={toolbarProps}
                openModal={() => setShowModal(true)}
            />
            <Modal
                setImage={setImage}
                open={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}
