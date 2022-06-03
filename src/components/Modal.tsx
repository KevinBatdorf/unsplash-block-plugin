import { __ } from '@wordpress/i18n'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModalContent } from './ModalContent'
import { ModalToolbar } from './ModalToolbar'
import { Sidebar } from './Sidebar'

type ModalProps = {
    open: boolean
    onClose: () => void
}

export const Modal = ({ open, onClose }: ModalProps) => {
    // const intialFocus = useRef(null)

    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    className="unlimited-photos-editor unlimited-photos-modal"
                    static
                    // initialFocus={intialFocus}
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
                            className="flex h-full w-full relative shadow-2xl overflow-hidden max-w-screen-2xl mx-auto">
                            <Dialog.Title className="sr-only">
                                {__('Listing images', 'unlimited-photos')}
                            </Dialog.Title>
                            <Sidebar />
                            <div className="flex flex-col bg-gray-50 w-full relative">
                                <div className="overflow-y-scroll h-full flex flex-col items-center">
                                    <ModalContent />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
