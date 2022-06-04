export type UnsplashImage = {
    id: string
    height: number
    width: number
    urls: {
        small: string
    }
}
export type ImageLike = {
    alt?: string
    caption?: string
    id?: number
    url?: string
    linkDestination?: string
    href?: string
    rel?: string
    linkTarget?: string
    linkClass?: string
}
export type WpImage = {
    id: number
    source_url: string
    mime_type: string
    alt_text: string
    link: string
    media_details: {
        file: string
        height: number
        width: number
    }
    caption: { raw: string }
    description: { raw: string }
    title: { raw: string }
    slug: string
    status: string
}

export type ImagePosition = {
    x: number
    y: number
    width: number
    height: number
    parent?: ImagePosition | undefined
}

export type MaybeUndefinedImagePosition = {
    x?: number | undefined
    y?: number | undefined
    width?: number | undefined
    height?: number | undefined
    parent?: ImagePosition | undefined
}
