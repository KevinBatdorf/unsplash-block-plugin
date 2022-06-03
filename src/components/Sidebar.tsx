import { Icon } from '@wordpress/components'
// import { __ } from '@wordpress/i18n'
// import { Dialog } from '@headlessui/react'
import { blockIcon } from '../icons'

export const Sidebar = () => {
    return (
        <div
            style={{
                backdropFilter: 'saturate(180%) blur(10px)',
            }}
            className="p-2 w-72 bg-gray-100 bg-opacity-80">
            <div className="w-6 h-6 mb-8">
                <Icon icon={blockIcon} size={24} />
            </div>
            sidebar
        </div>
    )
}
