import { useEffect, useState } from '@wordpress/element'
import useSWR from 'swr'
import { useGlobalState } from '../state/global'
import { UnsplashImage } from '../types'

type UnsplashResponse = {
    total_photos: number
    total_pages: number
    photos: UnsplashImage[]
}

type ListPhotosParams = {
    page?: number
    per_page?: number
    order_by?: string
}

export const usePhotos = (params: ListPhotosParams) => {
    const { setLoading, setTotalPages, searchTerm } = useGlobalState()
    const [cacheId, setCacheId] = useState(Math.floor(Math.random() * 10000))
    const queryParams = new URLSearchParams(
        // Convert object values to strings
        Object.entries(params).map(([key, value]) => [key, String(value)]),
    )
    const endpoint = searchTerm
        ? `search/photos?query=${searchTerm}&${queryParams.toString()}`
        : `photos?${queryParams.toString()}`

    const url = `http://unsplash-api-search.vercel.app/api/${endpoint}`
    const { data, error, isValidating } = useSWR<UnsplashResponse>(
        typeof searchTerm === 'string' ? url : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    useEffect(() => {
        setLoading(!error && !data?.photos)
        setTotalPages(data?.total_pages)
    }, [data, error, setLoading, setTotalPages])

    useEffect(() => {
        if (!data?.photos) return
        setCacheId(Math.floor(Math.random() * 10000000))
    }, [data])

    return {
        cacheId,
        data: data?.photos,
        error,
        isValidating,
    }
}
const fetcher = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}
