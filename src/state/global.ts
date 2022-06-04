import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type GlobalState = {
    page: number
    loading: boolean
    setLoading: (loading: boolean) => void
    nextPage: () => void
    prevPage: () => void
    searchTerm: string
}

export const useGlobalState = create<GlobalState>()(
    devtools(
        persist(
            (set) => ({
                page: 1,
                searchTerm: '',
                loading: false,
                setLoading: (loading: boolean) => {
                    set((state) => ({ ...state, loading }))
                },
                nextPage: () => {
                    set((state) => ({
                        ...state,
                        page: state.page + 1,
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
                partialize: (state) => ({ searchTerm: state.searchTerm }),
            },
        ),
    ),
)
