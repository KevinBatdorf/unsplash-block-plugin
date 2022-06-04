import { Icon } from '@wordpress/components'
import { useLayoutEffect, useState } from '@wordpress/element'
// import { __ } from '@wordpress/i18n'
// import { Dialog } from '@headlessui/react'
import { blockIcon } from '../icons'

export const Sidebar = () => {
    const [spin, setSpin] = useState(0)
    useLayoutEffect(() => {
        // If loading data, spin the icon
        let rafId = 0
        rafId = window.requestAnimationFrame(() => {
            // setSpin((spin) => spin + 5)
        })
        return () => window.cancelAnimationFrame(rafId)
    }, [spin])
    return (
        <div className="p-2 w-72">
            <div className="mb-4">
                <div
                    style={{
                        transform: `rotate(${spin}deg)`,
                    }}
                    className="w-6 h-6">
                    <Icon icon={blockIcon} size={24} />
                </div>
            </div>
            sidebar
        </div>
    )
}
