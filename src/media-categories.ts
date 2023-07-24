import { __, sprintf } from '@wordpress/i18n'
import { API_URL } from './config'
import { imageFetcher } from './hooks/usePhotos'
import { LexicaImage, UnsplashImage } from './types'

type MediaCategoryQuery = { search: string; per_page: number }

const buildUrl = (query: {
    search: string
    per_page: number
    type: string
}) => {
    const { search, per_page, type } = query
    const queryParams = new URLSearchParams(
        `per_page=${per_page}&imageSource=${type}`,
    )
    const endpoint = search
        ? `search/photos?query=${search}&${queryParams.toString()}`
        : `photos?${queryParams.toString()}`
    return `${API_URL}/api/${endpoint}`
}
const unsplashCaption = (image: UnsplashImage) =>
    image?.user?.username && image?.user?.name
        ? sprintf(
              __('Photo by %1$s on %2$s', 'unlimited-photos'),
              `<a href="https://unsplash.com/@${image.user.username}?utm_source=Unlimited%20Photos&utm_medium=referral">${image.user.name}</a>`,
              '<a href="https://unsplash.com/?utm_source=Unlimited%20Photos&utm_medium=referral">Unsplash</a>',
          )
        : image?.alt_description ?? ''

export const unsplash = {
    name: 'unlimited-photos-unsplash',
    labels: { name: 'Unsplash', search_items: 'Search Unsplash.com' },
    mediaType: 'image',
    isExternalResource: true,
    async fetch({ search, per_page }: MediaCategoryQuery) {
        const url = buildUrl({ search, per_page, type: 'unsplash' })
        const { photos } = await imageFetcher(url)
        return photos.map((image: UnsplashImage) => ({
            ...image,
            title: image.alt_description,
            caption: unsplashCaption(image),
            previewUrl: image.urls.small_s3,
            url: image.urls.full,
        }))
    },
}

export const lexica = {
    name: 'unlimited-photos-lexica',
    labels: { name: 'Lexica', search_items: 'Search Lexica.art' },
    mediaType: 'image',
    isExternalResource: true,
    async fetch({ search, per_page }: MediaCategoryQuery) {
        const url = buildUrl({ search, per_page, type: 'lexica' })
        const { photos } = await imageFetcher(url)
        // Slice since Lexia doesn't support pagination
        return photos.slice(0, Number(per_page)).map((image: LexicaImage) => ({
            ...image,
            title: image.prompt,
            caption: image.prompt,
            previewUrl: image.srcSmall,
            url: image.src,
        }))
    },
}
