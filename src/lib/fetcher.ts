import { useEffect, useState } from '@wordpress/element'
import useSWR from 'swr'
import { useGlobalState } from '../state/global'
import { UnsplashImage } from '../types'

type ListPhotosParams = {
    page?: number
    per_page?: number
    order_by?: string
}
export const useListPhotos = (params: ListPhotosParams) => {
    const { setLoading } = useGlobalState()
    const [cacheId, setCacheId] = useState(Math.floor(Math.random() * 10000))
    const queryParams = new URLSearchParams(
        // Convert object values to strings
        Object.entries(params).map(([key, value]) => [key, String(value)]),
    )

    const url = `http://unsplash-api-search.vercel.app/api/photos?${queryParams}`
    const { data, error, isValidating } = useSWR<UnsplashImage[]>(
        url,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    useEffect(() => {
        setLoading(!error && !data)
    }, [data, error, setLoading])

    useEffect(() => {
        if (!data) return
        setCacheId(Math.floor(Math.random() * 10000000))
    }, [data])

    return {
        cacheId,
        data,
        error,
        isValidating,
    }
}
const fetcher = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

// export const useSearchPhotos = () => {
//     return null
// }
