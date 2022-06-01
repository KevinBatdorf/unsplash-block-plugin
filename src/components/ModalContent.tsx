import { useListPhotos } from '../hooks/fetcher'
import { UnsplashImage } from '../types'

export const ModalContent = () => {
    const { data: images, error, isLoading } = useListPhotos({})

    return (
        <div className="grid w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50">
            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center">Error: {error.message}</div>}
            {images?.map((image: UnsplashImage) => (
                <img key={image.id} alt="" src={image.urls.small} />
            ))}
        </div>
    )
}
