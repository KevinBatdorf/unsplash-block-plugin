import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, BaseControl, Button } from '@wordpress/components'
import { useCallback, useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import type { Attributes } from '..'
import './editor.css'

interface ControlProps {
    attributes: Attributes
    setAttributes: (attributes: Attributes) => void
}

export const Controls = ({ attributes, setAttributes }: ControlProps) => {
    useEffect(() => {
        fetch(
            'http://unsplash-api-search.vercel.app/api/search/photos?query=cats',
        )
            .then((response) => response.json())
            .then((data) => {
                const images = data.results
                setAttributes({ images })
            })
    }, [setAttributes])

    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'unlimited-photos')}>
                <BaseControl id="get-text">
                    {/* To use TW just wrap the class with your namespace as
                    defined in tailwind.config.js file, but with -editor appended */}
                    <div className="unlimited-photos-editor">
                        <div className="p-4 bg-gray-200 mb-4">
                            This area is styled with Tailwind CSS. The button
                            below will use Rust to process the request.
                        </div>
                    </div>
                </BaseControl>
            </PanelBody>
        </InspectorControls>
    )
}
