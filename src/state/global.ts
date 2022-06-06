import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type GlobalState = {
    searchTerm: undefined | string
    page: number
    totalPages: number | undefined
    loading: boolean
    imageSize: 'full' | 'raw' | 'regular' | 'small'
    setLoading: (loading: boolean) => void
    setSearchTerm: (searchTerm: string) => void
    setTotalPages: (totalPages: number | undefined) => void
    nextPage: () => void
    prevPage: () => void
}

export const useGlobalState = create<GlobalState>()(
    devtools(
        persist(
            (set) => ({
                searchTerm: undefined,
                imageSize: 'full',
                page: 1,
                totalPages: undefined,
                loading: false,
                setSearchTerm: (searchTerm: string) => {
                    set(() => ({
                        page: 1,
                        searchTerm,
                    }))
                },
                setLoading: (loading: boolean) => {
                    set((state) => ({ ...state, loading }))
                },
                setTotalPages: (totalPages: number | undefined) => {
                    set((state) => ({ ...state, totalPages }))
                },
                nextPage: () => {
                    set((state) => ({
                        ...state,
                        page: Math.min(
                            state.page + 1,
                            state?.totalPages ?? state.page + 1,
                        ),
                    }))
                },
                prevPage: () => {
                    set((state) => ({
                        ...state,
                        page: Math.max(state.page - 1, 1),
                    }))
                },
            }),
            {
                name: 'unlimited-photos',
                getStorage: () => window.localStorage,
                partialize: (state) => ({
                    searchTerm: state.searchTerm,
                    imageSize: state.imageSize,
                }),
            },
        ),
    ),
)
