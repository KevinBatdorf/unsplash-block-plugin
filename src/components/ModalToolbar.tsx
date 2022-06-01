import { Icon } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { Dialog } from '@headlessui/react'
import { blockIcon, closeX } from '../icons'

export const ModalToolbar = ({
    onClose,
    title,
}: {
    onClose: () => void
    title: string
}) => (
    <div className="text-center flex items-center justify-between border-b border-gray-300 p-2 bg-white space-x-8">
        <div className="w-6 h-6">
            <Icon icon={blockIcon} size={24} />
        </div>
        <Dialog.Title className="m-0 text-base text-gray-900 leading-none font-medium">
            {title}
        </Dialog.Title>
        <div>
            <button
                className="block w-6 h-6 text-gray-900 p-px bg-transparent cursor-pointer outline-none focus:shadow-none focus:ring-wp focus:ring-wp-theme-500"
                type="button"
                onClick={onClose}
                aria-label={__('Close', 'unlimted-photos')}>
                <Icon icon={closeX} size={24} />
            </button>
        </div>
    </div>
)
