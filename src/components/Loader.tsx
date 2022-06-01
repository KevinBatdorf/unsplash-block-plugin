import { useEffect, useState } from '@wordpress/element'
import { ImageLike } from '../types'
import { Modal } from './Modal'
import { ToolbarControls, ToolbarControlsProps } from './ToolbarControls'

type LoaderProps = {
    attributes: ImageLike
    clientId?: string
    CurrentMenuItems?: React.ComponentType
    toolbarProps?: ToolbarControlsProps
}

export const Loader = ({
    attributes,
    clientId,
    CurrentMenuItems,
    toolbarProps,
}: LoaderProps) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const namespace = 'kevinbatdorf/unlimted-photos-open'
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

    return (
        <>
            <ToolbarControls
                clientId={clientId}
                CurrentMenuItems={CurrentMenuItems}
                toolbarProps={toolbarProps}
                openModal={() => setShowModal(true)}
            />
            <Modal open={showModal} onClose={() => setShowModal(false)} />
        </>
    )
}
