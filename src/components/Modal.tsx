import { useRef } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { Dialog } from '@headlessui/react'
import classnames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useGlobalState } from '../state/global'
import { ExternalImage } from '../types'
import { ModalCloseButton } from './ModalCloseButton'
import { ModalContent } from './ModalContent'
import { Sidebar } from './Sidebar'

type ModalProps = {
    open: boolean
    setImage: (image: ExternalImage) => void
    onClose: () => void
}

export const Modal = ({ open, onClose, setImage }: ModalProps) => {
    const initialFocus = useRef(null)
    const { currentTheme } = useGlobalState()

    const leftGradient =
        currentTheme === 'midnight'
            ? 'rgb(112 14 82)'
            : currentTheme === 'light'
            ? 'rgb(186, 230, 253)'
            : 'rgb(255 131 215)'
    const rightGradient =
        currentTheme === 'midnight'
            ? 'rgb(170 55 55)'
            : currentTheme === 'light'
            ? 'rgb(56, 189, 248)'
            : 'rgb(125 159 237)'

    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    className="unlimited-photos-editor unlimited-photos-modal"
                    static
                    data-cy-up="main-modal"
                    initialFocus={initialFocus}
                    as={motion.div}
                    key="modal"
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    open={open}
                    onClose={onClose}>
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                    <div
                        data-cy-up="main-modal"
                        className="absolute top-0 right-0 m-0.5 z-10 text-white">
                        <ModalCloseButton onClose={onClose} />
                    </div>
                    <div className="absolute mx-auto w-full h-full md:p-8">
                        <motion.div
                            key="modal"
                            id="unlimited-photos-modal-inner"
                            initial={{ y: 30 }}
                            animate={{ y: 0 }}
                            exit={{ y: 0, opacity: 0 }}
                            className={classnames(
                                'sm:flex h-full w-full relative shadow-2xl sm:overflow-hidden max-w-screen-2xl mx-auto',
                                {
                                    [`theme-${currentTheme}`]: true,
                                    'bg-white': currentTheme === 'light',
                                    'backdrop-blur': currentTheme === 'default',
                                    'bg-main-midnight':
                                        currentTheme == 'midnight',
                                },
                            )}>
                            <Dialog.Title className="sr-only">
                                {__('Listing images', 'unlimited-photos')}
                            </Dialog.Title>
                            <Sidebar initialFocus={initialFocus} />
                            <div
                                style={{
                                    backgroundImage: `linear-gradient(103.3deg, transparent 30%, ${leftGradient} 55.7%, ${rightGradient} 81.8%)`,
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
