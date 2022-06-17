import { Icon } from '@wordpress/components'
import { useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { cog } from '@wordpress/icons'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGlobalState } from '../state/global'
import { ModalCloseButton } from './ModalCloseButton'

export const SettingsModal = () => {
    const [open, setOpen] = useState(false)
    const initialFocus = useRef(null)
    return (
        <>
            <button
                type="button"
                data-cy-up="settings-button"
                onClick={() => setOpen(true)}
                className="components-button has-icon text-gray-800">
                <Icon icon={cog} />
                {__('Settings', 'unlimited-photos')}
            </button>
            <AnimatePresence>
                {open && (
                    <Dialog
                        className="unlimited-photos-editor unlimited-photos-modal"
                        static
                        initialFocus={initialFocus}
                        as={motion.div}
                        key="modal"
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        open={open}
                        onClose={() => null}>
                        <div className="absolute mx-auto w-full h-full hidden md:flex items-center justify-center">
                            <div
                                className="fixed inset-0 bg-black/40"
                                aria-hidden="true"
                            />
                            <motion.div
                                key="modal"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                exit={{ y: 0, opacity: 0 }}
                                data-cy-up="settings-modal"
                                className="sm:flex w-full relative shadow-2xl sm:overflow-hidden max-w-screen-xs mx-auto bg-white flex flex-col">
                                <div className="flex items-center justify-between border-b border-gray-300 p-4">
                                    <Dialog.Title className="m-0">
                                        {__('Settings', 'unlimited-photos')}
                                    </Dialog.Title>
                                    <ModalCloseButton
                                        onClose={() => setOpen(false)}
                                    />
                                </div>
                                <div className="flex flex-col w-full relative px-4 divide-y divide-gray-100 h-96 overflow-y-scroll">
                                    <SettingsSection />
                                </div>
                            </motion.div>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    )
}

const SettingsSection = () => {
    type imageSizes = 'regular' | 'full' | 'raw'
    const { imageSize, setImageSize } = useGlobalState()
    return (
        <div
            className="py-4"
            role="group"
            aria-labelledby="image-size-unsplash-photos">
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-baseline">
                <div>
                    <div
                        className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-900"
                        id="image-size-unsplash-photos">
                        {__('Image Size', 'unlimited-photos')}
                    </div>
                    <p className="text-xs text-gray-700 m-0 italic">
                        {__(
                            'Choose which image quality/size to import',
                            'unlimited-photos',
                        )}
                    </p>
                </div>
                <div className="">
                    <div className="pl-2 space-y-1">
                        {['regular', 'full', 'raw'].map((value) => {
                            return (
                                <div key={value} className="flex items-center">
                                    <input
                                        id={`image-size-${value}-unsplash-photos`}
                                        name="image-size-unsplash-photos"
                                        value={value}
                                        type="radio"
                                        checked={imageSize === value}
                                        onChange={() =>
                                            setImageSize(value as imageSizes)
                                        }
                                        className="h-4 w-4 m-0"
                                    />
                                    <label
                                        htmlFor={`image-size-${value}-unsplash-photos`}
                                        className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                                        {value}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
