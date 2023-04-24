import classnames from 'classnames'
import { useGlobalState } from '../state/global'

type SearchSuggestionsProps = {
    handlePress: (term: string) => void
    handleDelete?: (term: string) => void
    terms: string[]
    showUnderline?: boolean
    className?: string
}

export const SearchSuggestions = ({
    handlePress,
    handleDelete,
    showUnderline = true,
    terms,
    className = 'unlimited-photos-suggestions-list',
}: SearchSuggestionsProps) => {
    const { searchTerm, currentTheme, importing } = useGlobalState()

    return (
        <ul className={classnames('m-0 pt-1', className)}>
            {terms.map((term) => (
                <li
                    className="mb-0.5 flex gap-2 justify-between items-center group"
                    key={term}>
                    <button
                        type="button"
                        disabled={Boolean(importing)}
                        onClick={() => handlePress(term)}
                        className={classnames(
                            'p-0 bg-transparent focus:outline-none focus:shadow-none outline-none text-left text-sm cursor-pointer ring-main-blue focus:ring-wp font-light transition-all duration-200 ease-linear',
                            {
                                'border-b': showUnderline,
                                'border-transparent':
                                    term.toLowerCase() !==
                                    searchTerm?.toLowerCase(),
                                'border-gray-900':
                                    term.toLowerCase() ===
                                        searchTerm?.toLowerCase() &&
                                    currentTheme !== 'midnight',
                                'border-main-grayish':
                                    term.toLowerCase() ===
                                        searchTerm?.toLowerCase() &&
                                    currentTheme === 'midnight',
                                'hover:border-gray-900':
                                    currentTheme !== 'midnight',
                                'text-main-grayish hover:border-main-grayish':
                                    currentTheme === 'midnight',
                                'opacity-50': Boolean(importing),
                            },
                        )}>
                        {term}
                    </button>
                    {handleDelete && (
                        <button
                            type="button"
                            data-cy-up="delete-recent-search"
                            disabled={Boolean(importing)}
                            onClick={() => handleDelete(term)}
                            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 p-0 bg-transparent focus:outline-none focus:shadow-none outline-none text-left text-sm cursor-pointer ring-main-blue focus:ring-wp font-light transition-all duration-200 ease-linear">
                            <span className="sr-only">
                                {`Remove ${term} from recent searches`}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    )}
                </li>
            ))}
        </ul>
    )
}
