import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { useGlobalState } from '../state/global'

export const ButtonNav = ({ show }: { show?: boolean }) => {
    const { page, nextPage, prevPage, totalPages, currentTheme } =
        useGlobalState()
    if (!show || totalPages === 0) return null
    return (
        <div className="flex justify-center space-x-2 unlimited-photos-button-nav">
            <button
                disabled={page < 2}
                className={classnames(
                    'flex bg-gray-900 no-underline p-3 py-1 pl-2 text-sm outline-none focus:outline-none items-center justify-between',
                    {
                        'text-white cursor-pointer ring-main-blue focus:shadow-none focus:ring-wp':
                            page > 1,
                        'bg-opacity-30 text-gray-900 opacity-60':
                            page < 2 && currentTheme !== 'midnight',
                        'bg-opacity-30 text-main-grayish opacity-60':
                            page < 2 && currentTheme === 'midnight',
                    },
                )}
                aria-label={__(
                    'Load previous page of photos',
                    'unlimited-photos',
                )}
                onClick={prevPage}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>{' '}
                {__('previous', 'unlimited-photos')}
            </button>
            <button
                disabled={totalPages ? totalPages - page < 1 : true}
                className={classnames(
                    'flex bg-gray-900 no-underline p-3 py-1 pr-2 text-sm outline-none focus:outline-none items-center justify-between',
                    {
                        'text-white cursor-pointer ring-main-blue focus:shadow-none focus:ring-wp':
                            totalPages && totalPages - page > 1,
                        'bg-opacity-30 text-gray-900 opacity-60':
                            !totalPages || totalPages - page < 1,
                    },
                )}
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
