import useSWR from 'swr'

type ListPhotosParams = {
    page?: number
    per_page?: number
    order_by?: string
}
export const useListPhotos = (params: ListPhotosParams) => {
    const queryParams = new URLSearchParams(
        // Convert object values to strings
        Object.entries(params).map(([key, value]) => [key, String(value)]),
    )

    const url = `http://unsplash-api-search.vercel.app/api/photos?${queryParams}`
    const { data, error, isValidating } = useSWR(url, fetcher)
    return {
        data,
        error,
        isValidating,
        isLoading: !error && !data,
    }
}
const fetcher = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

// export const useSearchPhotos = () => {
//     return null
// }
