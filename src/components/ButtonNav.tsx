import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { useGlobalState } from '../state/global'

export const ButtonNav = ({ show }: { show?: boolean }) => {
    const { page, nextPage, prevPage } = useGlobalState()
    if (!show) return null
    return (
        <div className="flex justify-center space-x-2">
            <button
                disabled={page < 2}
                className={classnames('bg-gray-900 p-3 py-1 text-sm', {
                    'text-white': page > 1,
                    'bg-opacity-30 text-gray-900 opacity-60': page < 2,
                })}
                aria-label={__(
                    'Load previous page of photos',
                    'unlimited-photos',
                )}
                onClick={prevPage}>
                {__('previous', 'unlimited-photos')}
            </button>
            <button
                className="bg-gray-900 p-3 py-1 text-sm text-white flex items-center justify-between outline-none cursor-pointer text-center no-underline ring-wp-theme-500 focus:shadow-none focus:ring-wp"
                aria-label={__('Load next page of photos', 'unlimited-photos')}
                onClick={nextPage}>
                {__('next', 'unlimited-photos')}{' '}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}
