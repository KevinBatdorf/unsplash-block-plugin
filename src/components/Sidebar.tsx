import { Icon, ToggleControl } from '@wordpress/components'
import { useEffect, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { blockIconThin } from '../icons'
import { useGlobalState } from '../state/global'
import { artistTerms, defaultTerms } from '../suggested-search'
import { PhpMaxFileSizeWarning } from './Errors'
import { SearchSuggestions } from './SearchSuggestions'
import { SettingsModal } from './SettingsModal'

export const Sidebar = ({
    initialFocus,
}: {
    initialFocus: React.RefObject<HTMLInputElement>
}) => {
    const {
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        importing,
        imageSize,
        currentTheme,
        recent,
        setRecent,
        deleteRecent,
        imageSource,
        setImageSource,
    } = useGlobalState()
    const [search, setSearch] = useState('')
    const [showImportWarning, setShowImportWarning] = useState(false)
    const touched = useRef(false)
    const textShadow = {
        textShadow: currentTheme === 'midnight' ? '0 0 4px white' : undefined,
    }

    useEffect(() => {
        if (imageSize === 'regular') {
            setShowImportWarning(false)
            return
        }
        //  eslint-disable-next-line
        //  @ts-ignore-next-line
        if (Number(window?.unlimitedPhotosConfig?.maxUploadSize) < 3) {
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
        setRecent(searchTerm)
    }, [setSearch, searchTerm, setRecent])

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
                    <Icon
                        icon={() =>
                            blockIconThin(
                                currentTheme === 'midnight'
                                    ? '#ded8e6'
                                    : '#1e1e1e',
                            )
                        }
                        size={24}
                    />
                </div>
                <h1
                    className={classnames(
                        'font-thin text-xl tracking-wide m-0 -mt-px',
                        {
                            'text-main-grayish': currentTheme === 'midnight',
                            'text-gray-900': currentTheme !== 'midnight',
                        },
                    )}
                    style={textShadow}>
                    Unlimited Photos
                </h1>
            </div>
            <div className="flex flex-col gap-2 px-4">
                <form onSubmit={(e) => e.preventDefault()}>
                    <label
                        htmlFor="unlimited-photos-search"
                        className={classnames(
                            'block text-xs font-medium mb-3',
                            {
                                'text-main-grayish':
                                    currentTheme === 'midnight',
                                'text-gray-800': currentTheme !== 'midnight',
                            },
                        )}
                        style={textShadow}>
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
                                'm-0 block rounded-none w-full sm:text-sm outline-none focus:outline-none ring-main-blue focus:shadow-none focus:ring-wp',
                                {
                                    'bg-gray-400': importing,
                                    'text-main-grayish border-gray-900 focus:border-gray-900 bg-main-magenta':
                                        currentTheme === 'midnight',
                                    'border-gray-700 focus:border-gray-700 bg-gray-100 text-gray-900':
                                        currentTheme !== 'midnight',
                                },
                            )}
                            aria-describedby="search-description"
                        />
                    </div>
                    <p
                        className={classnames(
                            'mt-2 text-xs italic font-light',
                            {
                                'text-main-grayish text-opacity-60':
                                    currentTheme === 'midnight',
                                'text-gray-800': currentTheme !== 'midnight',
                            },
                        )}
                        id="search-description">
                        {__(
                            'Search millions of photos, textures, wallpapers, and more.',
                            'unlimited-photos',
                        )}
                    </p>
                </form>
                <div data-cy-up="ai-images-toggle">
                    <ToggleControl
                        label={__('Search AI Images', 'unlimited-photos')}
                        className={classnames({
                            'text-main-grayish': currentTheme === 'midnight',
                            'text-gray-800': currentTheme !== 'midnight',
                        })}
                        checked={imageSource === 'lexica'}
                        onChange={() => {
                            setPage(1)
                            setImageSource(
                                imageSource === 'lexica'
                                    ? 'unsplash'
                                    : 'lexica',
                            )
                        }}
                    />
                </div>
                {showImportWarning && (
                    <PhpMaxFileSizeWarning
                        // eslint-disable-next-line
                        // @ts-ignore-next-line
                        size={window.unlimitedPhotosConfig.maxUploadSize}
                    />
                )}
            </div>

            <div className="hidden md:flex flex-col overflow-hidden">
                {recent?.length > 0 && (
                    <div id="unlimited-photos-recent-searches" className="mb-6">
                        <h2
                            className={classnames(
                                'p-0 px-4 text-xs leading-none m-0 mb-2 font-medium',
                                {
                                    'text-main-grayish':
                                        currentTheme === 'midnight',
                                    'text-gray-800':
                                        currentTheme !== 'midnight',
                                },
                            )}
                            style={textShadow}>
                            {__('Recent', 'unlmiited-photos')}
                        </h2>
                        <div className="px-4">
                            <SearchSuggestions
                                className="unlimited-photos-recent-list"
                                terms={recent}
                                showUnderline={false}
                                handlePress={(term: string) => {
                                    touched.current = true
                                    setPage(1)
                                    setSearchTerm(term.toLowerCase())
                                    setSearch(term.toLowerCase())
                                }}
                                handleDelete={deleteRecent}
                            />
                        </div>
                    </div>
                )}
                <h2
                    className={classnames(
                        'p-0 px-4 text-xs leading-none m-0 mb-2 font-medium',
                        {
                            'text-main-grayish': currentTheme === 'midnight',
                            'text-gray-800': currentTheme !== 'midnight',
                        },
                    )}
                    style={textShadow}>
                    {__('Suggestions', 'unlmiited-photos')}
                </h2>
                <div className="px-4 overflow-y-auto">
                    <SearchSuggestions
                        terms={
                            imageSource === 'unsplash'
                                ? defaultTerms
                                : artistTerms
                        }
                        handlePress={(term: string) => {
                            touched.current = true
                            setPage(1)
                            setSearchTerm(term.toLowerCase())
                            setSearch(term.toLowerCase())
                        }}
                    />
                </div>
            </div>
            <div className="h-12 w-full flex-grow hidden md:flex items-end pl-2 pb-2">
                <SettingsModal />
            </div>
        </div>
    )
}
