import { useEffect, useState } from '@wordpress/element'
import useSWR from 'swr'
import { API_URL } from '../config'
import { useGlobalState } from '../state/global'
import { ExternalImage } from '../types'

type ImageResponse = {
    total_photos: number
    total_pages: number
    photos: ExternalImage[]
}

type ListPhotosParams = {
    imageSource: 'unsplash' | 'lexica'
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

    const url = `${API_URL}/api/${endpoint}`
    const { data, error, isValidating } = useSWR<ImageResponse>(url, imageFetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 30_000,
    })

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
export const imageFetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error((await res.json())?.message || res.statusText)
    return await res.json()
}
