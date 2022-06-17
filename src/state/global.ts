import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type GlobalState = {
    importing: string | boolean
    searchTerm: undefined | string
    page: number
    totalPages: number | undefined
    loading: boolean | undefined
    imageSize: 'full' | 'raw' | 'regular'
    setImporting: (loading: string | boolean) => void
    setLoading: (loading: boolean) => void
    setSearchTerm: (searchTerm: string) => void
    setTotalPages: (totalPages: number | undefined) => void
    nextPage: () => void
    prevPage: () => void
    setPage: (page: number) => void
    setImageSize: (imageSize: 'full' | 'raw' | 'regular') => void
}

export const useGlobalState = create<GlobalState>()(
    devtools(
        persist(
            (set) => ({
                importing: false,
                searchTerm: undefined,
                imageSize: 'full',
                page: 1,
                totalPages: undefined,
                loading: undefined,
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
            }),
            {
                name: 'unlimited-photos',
                getStorage: () => window.localStorage,
                partialize: (state) => ({
                    searchTerm: state.searchTerm ? state.searchTerm : undefined,
                    imageSize: state.imageSize,
                }),
            },
        ),
    ),
)
