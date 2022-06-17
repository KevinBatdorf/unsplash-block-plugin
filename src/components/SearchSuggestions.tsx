import classnames from 'classnames'
import { useGlobalState } from '../state/global'

type SearchSuggestionsProps = {
    handlePress: (term: string) => void
}
export const SearchSuggestions = ({ handlePress }: SearchSuggestionsProps) => {
    const { searchTerm, currentTheme, importing } = useGlobalState()
    const terms = [
        'Current Events',
        'Wallpapers',
        // '3D Renders',
        'Textures',
        'Patterns',
        'Experimental',
        'Architecture',
        'Nature',
        'Business & Work',
        'Fashion',
        // 'Film',
        'Food & Drink',
        'Health & Wellness',
        'Animals',
        'Fitness',
        'People',
        // 'Interiors',
        // 'Street Photography',
        'Travel',
        // 'Spirtuality',
        // 'Arts & Culture',
        // 'History',
        'Athletics',
    ]

    return (
        <ul className="m-0 pt-1 unlimited-photos-suggestions-list">
            {terms.map((term) => (
                <li className="mb-0.5" key={term}>
                    <button
                        type="button"
                        disabled={Boolean(importing)}
                        onClick={() => handlePress(term)}
                        className={classnames(
                            'p-0 bg-transparent focus:outline-none focus:shadow-none outline-none text-left text-sm border-b cursor-pointer ring-main-blue focus:ring-wp font-light transition-all duration-200 ease-linear',
                            {
                                'border-transparent': term !== searchTerm,
                                'border-gray-900':
                                    term === searchTerm &&
                                    currentTheme !== 'midnight',
                                'border-main-grayish':
                                    term === searchTerm &&
                                    currentTheme === 'midnight',
                                'hover:border-gray-900':
                                    currentTheme !== 'midnight',
                                'text-main-grayish hover:border-main-grayish':
                                    currentTheme === 'midnight',
                            },
                        )}>
                        {term}
                    </button>
                </li>
            ))}
        </ul>
    )
}
