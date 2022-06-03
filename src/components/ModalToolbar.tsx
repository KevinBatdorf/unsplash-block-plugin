import { Icon } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { closeX } from '../icons'

export const ModalToolbar = ({ onClose }: { onClose: () => void }) => (
    <button
        className="block w-6 h-6 absolute top-0 right-0 m-0.5 text-gray-900 p-px bg-transparent cursor-pointer outline-none focus:shadow-none focus:ring-wp focus:ring-wp-theme-500"
        type="button"
        onClick={onClose}
        aria-label={__('Close', 'unlimted-photos')}>
        <Icon icon={closeX} size={24} />
    </button>
)
