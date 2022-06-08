import classnames from 'classnames'
import { useGlobalState } from '../state/global'

type SearchSuggestionsProps = {
    handlePress: (term: string) => void
}
export const SearchSuggestions = ({ handlePress }: SearchSuggestionsProps) => {
    const { searchTerm } = useGlobalState()
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
        'Fitness',
        'People',
        // 'Interiors',
        // 'Street Photography',
        'Travel',
        'Animals',
        'Spirtuality',
        // 'Arts & Culture',
        // 'History',
        'Athletics',
    ]

    return (
        <ul className="m-0 pt-1">
            {terms.map((term) => (
                <li className="mb-0.5" key={term}>
                    <button
                        type="button"
                        onClick={() => handlePress(term)}
                        className={classnames(
                            'p-0 bg-transparent focus:outline-none focus:shadow-none outline-none text-left text-sm border-b hover:border-gray-900 cursor-pointer ring-main-blue focus:ring-wp font-light transition-all duration-200 ease-linear',
                            {
                                'border-transparent': term !== searchTerm,
                                'border-gray-900': term === searchTerm,
                            },
                        )}>
                        {term}
                    </button>
                </li>
            ))}
        </ul>
    )
}
