import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type GlobalState = {
    importing: string | boolean
    searchTerm: undefined | string
    page: number
    totalPages: number | undefined
    loading: boolean | undefined
    imageSize: 'full' | 'raw' | 'regular'
    currentTheme: 'default' | 'midnight' | 'light'
    blurNSFW: boolean
    imageSource: 'unsplash' | 'lexica'
    recent: string[]
    setRecent: (recent: string) => void
    deleteRecent: (recent: string) => void
    setImageSource: (imageSource: 'unsplash' | 'lexica') => void
    setBlurNSFW: (blurNSFW: boolean) => void
    setImporting: (loading: string | boolean) => void
    setLoading: (loading: boolean) => void
    setSearchTerm: (searchTerm: string) => void
    setTotalPages: (totalPages: number | undefined) => void
    nextPage: () => void
    prevPage: () => void
    setPage: (page: number) => void
    setImageSize: (imageSize: 'full' | 'raw' | 'regular') => void
    setCurrentTheme: (currentTheme: 'default' | 'midnight' | 'light') => void
}

export const useGlobalState = create<GlobalState>()(
    devtools(
        persist(
            (set) => ({
                importing: false,
                searchTerm: undefined,
                imageSize: 'regular',
                page: 1,
                totalPages: undefined,
                loading: undefined,
                currentTheme: 'default',
                blurNSFW: true,
                imageSource: 'unsplash',
                recent: [],
                setRecent: (recent: string) => {
                    // Remove recent if it exists
                    set((state) => ({
                        ...state,
                        recent: state.recent.filter((r) => r !== recent),
                    }))
                    // Add recent to the beginning of the array
                    set((state) => ({
                        ...state,
                        // but only keep 5 total
                        recent: [recent, ...state.recent].slice(0, 3),
                    }))
                },
                deleteRecent: (recent: string) => {
                    set((state) => ({
                        ...state,
                        recent: state.recent.filter((r) => r !== recent),
                    }))
                },
                setImageSource: (imageSource: 'unsplash' | 'lexica') => {
                    set((state) => ({ ...state, imageSource }))
                },
                setBlurNSFW: (blurNSFW: boolean) => {
                    set((state) => ({ ...state, blurNSFW }))
                },
                setSearchTerm: (searchTerm: string) => {
                    set(() => ({ searchTerm }))
                },
                setImporting: (importing: boolean | string) => {
                    set((state) => ({ ...state, importing }))
                },
                setLoading: (loading: boolean) => {
                    set((state) => ({ ...state, loading }))
                },
                setTotalPages: (totalPages: number | undefined) => {
                    set((state) => ({ ...state, totalPages }))
                },
                nextPage: () => {
                    set((state) => {
                        if (state.importing) return state
                        return {
                            ...state,
                            page: Math.min(
                                state.page + 1,
                                state?.totalPages ?? state.page + 1,
                            ),
                        }
                    })
                },
                prevPage: () => {
                    set((state) => {
                        if (state.importing) return state
                        return {
                            ...state,
                            page: Math.max(state.page - 1, 1),
                        }
                    })
                },
                setPage: (page: number) => {
                    set((state) => {
                        if (state.importing) return state
                        return {
                            ...state,
                            page,
                        }
                    })
                },
                setImageSize(size: 'full' | 'raw' | 'regular') {
                    set((state) => ({ ...state, imageSize: size }))
                },
                setCurrentTheme(theme: 'default' | 'midnight' | 'light') {
                    set((state) => ({ ...state, currentTheme: theme }))
                },
            }),
            {
                name: 'unlimited-photos',
                partialize: (state) => ({
                    searchTerm: state.searchTerm ? state.searchTerm : undefined,
                    currentTheme: state.currentTheme,
                    imageSize: state.imageSize,
                    blurNSFW: state.blurNSFW,
                    imageSource: state.imageSource,
                    recent: state.recent,
                }),
            },
        ),
    ),
)
