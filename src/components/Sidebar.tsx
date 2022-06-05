import { Icon } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { blockIcon } from '../icons'
import { useGlobalState } from '../state/global'

export const Sidebar = ({
    initialFocus,
}: {
    initialFocus: React.RefObject<HTMLInputElement>
}) => {
    const { page, searchTerm, setSearchTerm } = useGlobalState()
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!initialFocus?.current) return
        initialFocus.current.focus()
    }, [page, initialFocus])

    useEffect(() => {
        if (!searchTerm) return
        setSearch(searchTerm)
    }, [setSearch, searchTerm])

    useEffect(() => {
        let timerId = 0
        window.clearTimeout(timerId)
        timerId = window.setTimeout(() => {
            setSearchTerm(search)
        }, 2000)
        return () => window.clearTimeout(timerId)
    }, [search, setSearchTerm])

    return (
        <div className="w-72">
            <div className="p-2 mb-8 flex space-x-3">
                <div style={{ transform: 'rotate(61deg)' }} className="w-6 h-6">
                    <Icon icon={blockIcon} size={24} />
                </div>
                <h1 className="font-thin text-xl tracking-wide m-0 -mt-1">
                    Unlimited Photos
                </h1>
            </div>
            <div className="px-4">
                <label
                    htmlFor="search"
                    className="block text-xs font-medium text-gray-900">
                    {__('Search', 'unlimited-photos')}
                </label>
                <div className="mt-1">
                    <input
                        ref={initialFocus}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        name="search"
                        id="search"
                        className="block rounded-none w-full sm:text-sm border-gray-700 focus:border-gray-700 bg-gray-100 outline-none focus:outline-none ring-main-blue focus:shadow-none focus:ring-wp"
                        aria-describedby="search-description"
                    />
                </div>
                <p
                    className="mt-2 text-xs text-gray-700"
                    id="search-description">
                    {__(
                        'Search over 3 million photos and textures.',
                        'unlimited-photos',
                    )}
                </p>
            </div>
        </div>
    )
}
