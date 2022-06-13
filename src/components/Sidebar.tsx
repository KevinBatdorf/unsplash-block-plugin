import { Icon } from '@wordpress/components'
import { useEffect, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { blockIconThin } from '../icons'
import { useGlobalState } from '../state/global'
import { PhpMaxFileSizeWarning } from './Errors'
import { SearchSuggestions } from './SearchSuggestions'

export const Sidebar = ({
    initialFocus,
}: {
    initialFocus: React.RefObject<HTMLInputElement>
}) => {
    const { page, setPage, searchTerm, setSearchTerm, importing, imageSize } =
        useGlobalState()
    const [search, setSearch] = useState('')
    const [showImportWarning, setShowImportWarning] = useState(false)
    const touched = useRef(false)

    useEffect(() => {
        if (imageSize === 'small') return
        //  eslint-disable-next-line
        //  @ts-ignore-next-line
        if (Number(window?.unlimitedPhotosConfig?.maxUploadSize) < 10) {
            setShowImportWarning(true)
        }
    }, [imageSize])

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
        <div className="sm:w-52 md:w-64 space-y-6 flex-shrink-0 flex flex-col">
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
                    htmlFor="unlimited-photos-search"
                    className="block text-xs font-medium text-gray-800 mb-3">
                    {__('Search', 'unlimited-photos')}
                </label>
                <div>
                    <input
                        ref={initialFocus}
                        value={search}
                        onChange={(e) => {
                            touched.current = true
                            setSearch(e.target.value)
                        }}
                        type="search"
                        name="unlimited-photos-search"
                        id="unlimited-photos-search"
                        disabled={Boolean(importing)}
                        className={classnames(
                            'm-0 block rounded-none w-full sm:text-sm border-gray-700 focus:border-gray-700 bg-gray-100 outline-none focus:outline-none ring-main-blue focus:shadow-none focus:ring-wp',
                            {
                                'bg-gray-400': importing,
                            },
                        )}
                        aria-describedby="search-description"
                    />
                </div>
                <p
                    className="mt-2 text-xs italic text-gray-800 font-light"
                    id="search-description">
                    {__(
                        'Search over 3 million photos, textures, wallpapers, and more.',
                        'unlimited-photos',
                    )}
                </p>
            </form>
            {showImportWarning && (
                <PhpMaxFileSizeWarning
                    // eslint-disable-next-line
                    // @ts-ignore-next-line
                    size={window.unlimitedPhotosConfig.maxUploadSize}
                />
            )}

            <div className="flex flex-col overflow-hidden">
                <h2 className="p-0 px-4 text-xs text-gray-800 leading-none m-0 mb-2 font-medium">
                    {__('Suggestions', 'unlmiited-photos')}
                </h2>
                <div className="px-4 hidden md:block overflow-y-scroll">
                    <SearchSuggestions
                        handlePress={(term: string) => {
                            touched.current = true
                            setPage(1)
                            setSearchTerm(term)
                            setSearch(term)
                        }}
                    />
                </div>
            </div>
            <div className="h-12 w-full flex-grow"></div>
        </div>
    )
}
