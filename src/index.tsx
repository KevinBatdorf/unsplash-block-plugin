import { useBlockProps as blockProps } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import blockConfig from './block.json'
import { Controls } from './editor/Controls'
import { TheBlock } from './front/TheBlock'

export type Attributes = {
    images: UnsplashImage[]
}

type UnsplashImage = {
    id: string
    urls: {
        small: string
    }
}

registerBlockType<Attributes>('kevinbatdorf/unlimited-photos', {
    ...blockConfig,
    icon: undefined,
    // Types seem to be mismatched if importing these from block.json
    attributes: {
        images: {
            type: 'array',
            default: [],
        },
    },

    title: __('Unlimited Photos', 'unlimited-photos'),
    edit: ({ attributes, setAttributes }) => (
        <>
            <Controls attributes={attributes} setAttributes={setAttributes} />
            <div {...blockProps()}>
                <TheBlock {...attributes} />
            </div>
        </>
    ),
    save: ({ attributes }) => {
        return (
            <div {...blockProps.save()}>
                <TheBlock {...attributes} />
            </div>
        )
    },
})
