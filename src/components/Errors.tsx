import { useState } from '@wordpress/element'
import { __, sprintf } from '@wordpress/i18n'

export const PhpMaxFileSizeWarning = ({ size }: { size: string }) => {
    const [show, setShow] = useState(true)

    if (!show) return null
    return (
        <div
            data-cy-up="file-size-warning"
            className="bg-wp-alert-yellow p-4 text-gray-900 relative">
            <button
                className="absolute top-0 right-0 bg-transparent shadow-none"
                onClick={() => setShow(false)}
                type="button"
                aria-label={__('Dismiss', 'unlimited-photos')}>
                x
            </button>
            <p className="m-0">
                {sprintf(
                    __(
                        "Warning: Your server has a max upload size of %1$sMB. We've lowered the import quality to avoid import issues.",
                        'unlimited-photos',
                    ),
                    size,
                )}
            </p>
            <a
                className=""
                target="_blank"
                title={__('More information', 'unlimited-photos')}
                href="https://wordpress.org/plugins/unlimited-photos/#your%20server%20has%20a%20max%20upload%20size%20of"
                rel="noreferrer">
                {__('Learn more', 'unlimited-photos')}
            </a>
        </div>
    )
}
