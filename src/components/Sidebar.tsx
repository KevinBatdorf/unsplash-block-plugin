import { Icon } from '@wordpress/components'
import { useEffect, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { blockIconThin } from '../icons'
import { useGlobalState } from '../state/global'

export const Sidebar = ({
    initialFocus,
}: {
    initialFocus: React.RefObject<HTMLInputElement>
}) => {
    const { page, setPage, searchTerm, setSearchTerm, importing } =
        useGlobalState()
    const [search, setSearch] = useState('')
    const touched = useRef(false)

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
        if (importing) return
        if (searchTerm === search) return
        if (!touched.current) return
        if (!search) {
            setPage(1)
            setSearchTerm('')
            return
        }
        window.clearTimeout(timerId)
        timerId = window.setTimeout(() => {
            setPage(1)
            setSearchTerm(search)
        }, 500)
        return () => window.clearTimeout(timerId)
    }, [search, setSearchTerm, importing, setPage, searchTerm])

    return (
        <div className="w-52 md:w-64 space-y-8 flex-shrink-0">
            <div className="p-2 flex space-x-1.5">
                <div className="w-6 h-6">
                    <Icon icon={blockIconThin} size={24} />
                </div>
                <h1 className="font-thin text-xl tracking-wide m-0 -mt-px">
                    Unlimited Photos
                </h1>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                }}
                className="px-4">
                <label
                    htmlFor="unlimited-images-search"
                    className="block text-xs font-medium text-gray-900">
                    {__('Search', 'unlimited-photos')}
                </label>
                <div className="mt-1">
                    <input
                        ref={initialFocus}
                        value={search}
                        onChange={(e) => {
                            touched.current = true
                            setSearch(e.target.value)
                        }}
                        type="search"
                        name="unlimited-images-search"
                        id="unlimited-images-search"
                        disabled={Boolean(importing)}
                        className={classnames(
                            'block rounded-none w-full sm:text-sm border-gray-700 focus:border-gray-700 bg-gray-100 outline-none focus:outline-none ring-main-blue focus:shadow-none focus:ring-wp',
                            {
                                'bg-gray-400': importing,
                            },
                        )}
                        aria-describedby="search-description"
                    />
                </div>
                <p
                    className="mt-2 text-xs text-gray-700"
                    id="search-description">
                    {__(
                        'Search over 3 million photos, textures, wallpapers, and more.',
                        'unlimited-photos',
                    )}
                </p>
            </form>
        </div>
    )
}
