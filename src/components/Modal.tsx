import { useRef } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnsplashImage } from '../types'
import { ModalContent } from './ModalContent'
import { ModalToolbar } from './ModalToolbar'
import { Sidebar } from './Sidebar'

type ModalProps = {
    open: boolean
    setImage: (image: UnsplashImage) => void
    onClose: () => void
}

export const Modal = ({ open, onClose, setImage }: ModalProps) => {
    const initialFocus = useRef(null)

    return (
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
                    onClose={onClose}>
                    <div className="absolute mx-auto w-full h-full p-8">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
                        <ModalToolbar onClose={onClose} />
                        <motion.div
                            key="modal"
                            initial={{ y: 30 }}
                            animate={{ y: 0 }}
                            exit={{ y: 0, opacity: 0 }}
                            className="flex h-full w-full relative shadow-2xl overflow-hidden max-w-screen-2xl mx-auto bg-gray-100 bg-opacity-60"
                            style={{
                                backdropFilter: 'saturate(180%) blur(10px)',
                            }}>
                            <Dialog.Title className="sr-only">
                                {__('Listing images', 'unlimited-photos')}
                            </Dialog.Title>
                            <Sidebar initialFocus={initialFocus} />
                            <div
                                style={{
                                    backgroundImage:
                                        'linear-gradient(103.3deg, transparent 30%, rgb(255 131 215) 55.7%, rgb(125 159 237) 81.8%)',
                                }}
                                className="flex flex-col w-full relative">
                                <ModalContent setImage={setImage} />
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
