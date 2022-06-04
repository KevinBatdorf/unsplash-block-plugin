import { Icon } from '@wordpress/components'
import { blockIcon } from '../icons'

export const Sidebar = () => {
    return (
        <div className="p-2 w-72">
            <div className="mb-4 flex space-x-3">
                <div style={{ transform: 'rotate(61deg)' }} className="w-6 h-6">
                    <Icon icon={blockIcon} size={24} />
                </div>
                <h1 className="font-thin text-xl tracking-wide m-0 -mt-1">
                    Unlimited Photos
                </h1>
            </div>
            sidebar
        </div>
    )
}
