import type { Attributes } from '..'
import './style.css'

export const TheBlock = ({ images }: Attributes) => {
    console.log({ images })
    return (
        <div className="unlimited-photos">
            <div className="p-4 py-8 text-xl text-white bg-indigo-500 shadow-lg">
                {images?.map((image) => (
                    <img key={image.id} alt="" src={image.urls.small} />
                ))}
            </div>
        </div>
    )
}
