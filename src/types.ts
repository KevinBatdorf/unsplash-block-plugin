export type ExternalImage = UnsplashImage | LexicaImage

export type UnsplashImage = {
    id: string
    source: 'unsplash'
    height: number
    width: number
    alt_description: null | string
    urls: {
        [T in 'raw' | 'full' | 'regular' | 'small' | 'small_s3' | 'thumb']: string
    }
    links: {
        download_location: string
    }
    user: {
        username: string
        name: string
    }
}

export type LexicaImage = {
    id: number
    source: 'lexica'
    gallery: string
    src: string
    srcSmall: string
    prompt: string
    width: number
    height: number
    seed: string
    grid: boolean
    model: string
    guidance: number
    promptid: string
    nsfw: boolean
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
