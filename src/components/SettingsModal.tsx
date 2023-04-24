import { Icon } from '@wordpress/components'
import { useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { cog } from '@wordpress/icons'
import { Dialog, RadioGroup } from '@headlessui/react'
import classnames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useGlobalState } from '../state/global'
import { ModalCloseButton } from './ModalCloseButton'

export const SettingsModal = () => {
    const [open, setOpen] = useState(false)
    const initialFocus = useRef(null)
    const { currentTheme, importing } = useGlobalState()
    return (
        <>
            <button
                type="button"
                disabled={Boolean(importing)}
                data-cy-up="settings-button"
                onClick={() => setOpen(true)}
                style={{
                    textShadow:
                        currentTheme === 'midnight'
                            ? '0 0 4px white'
                            : undefined,
                }}
                className={classnames(
                    'bg-transparent flex focus:outline-none focus:ring-wp focus:shadow-none items-center outline-none ring-main-blue',
                    {
                        'text-main-grayish focus:text-main-grayish':
                            currentTheme === 'midnight',
                        'text-gray-800 focus:text-gray-800':
                            currentTheme !== 'midnight',
                        'opacity-50': Boolean(importing),
                    },
                )}>
                <Icon className="fill-current" icon={cog} />
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
                        onClose={() => setOpen(false)}>
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
                                <div className="flex items-center justify-between border-b border-gray-300 p-4 text-gray-900">
                                    <Dialog.Title className="m-0">
                                        {__('Settings', 'unlimited-photos')}
                                    </Dialog.Title>
                                    <ModalCloseButton
                                        onClose={() => setOpen(false)}
                                    />
                                </div>
                                <div className="flex flex-col w-full relative px-4 divide-y divide-gray-100 h-96 overflow-y-auto">
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
            className="py-4 gap-4 flex flex-col"
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
            <div>
                <ThemeSelect />
            </div>
            <div>
                <ToggleNSFW />
            </div>
        </div>
    )
}

const ToggleNSFW = () => {
    const { blurNSFW, setBlurNSFW } = useGlobalState()
    return (
        <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-baseline">
            <div>
                <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-900">
                    {__('Blur NSFW Images', 'unlimited-photos')}
                </div>
                <p className="text-xs text-gray-700 m-0 italic">
                    {__(
                        'AI-generated images may have content with adult themes',
                        'unlimited-photos',
                    )}
                </p>
            </div>
            <div className="pl-2 space-y-1">
                {['blur', 'do-not-blur'].map((value) => {
                    return (
                        <div key={value} className="flex items-center">
                            <input
                                id={`nsfw-${value}-unsplash-photos`}
                                name="nsfw-blur-unsplash-photos"
                                value={value}
                                type="radio"
                                checked={
                                    value === 'blur' ? blurNSFW : !blurNSFW
                                }
                                onChange={() => setBlurNSFW(value === 'blur')}
                                className="h-4 w-4 m-0"
                            />
                            <label
                                htmlFor={`nsfw-${value}-unsplash-photos`}
                                className="ml-2 block text-sm font-medium text-gray-700 capitalize">
                                {value === 'blur'
                                    ? __('Blur', 'unlimited-photos')
                                    : __('Do not blur', 'unlimited-photos')}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const ThemeSelect = () => {
    const { currentTheme, setCurrentTheme } = useGlobalState()
    return (
        <RadioGroup value={currentTheme} onChange={setCurrentTheme}>
            <RadioGroup.Label className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-900 mb-2 block">
                {__('Theme', 'unlimited-photos')}
            </RadioGroup.Label>

            <div className="grid grid-cols-3 gap-x-4">
                {['default', 'light', 'midnight'].map((theme) => (
                    <RadioGroup.Option
                        key={theme}
                        value={theme}
                        className={({ active }) =>
                            classnames(
                                { 'ring-2 ': active },
                                'relative bg-white border shadow-sm p-4 flex cursor-pointer focus:outline-none border-gray-300 ring-main-blue ring-offset-2 ring-offset-white',
                            )
                        }>
                        {({ checked }) => (
                            <>
                                <span className="flex-1 flex">
                                    <span className="flex flex-col">
                                        <RadioGroup.Label
                                            as="span"
                                            className="block capitalize text-sm font-medium text-gray-900">
                                            {theme}
                                        </RadioGroup.Label>
                                    </span>
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={classnames(
                                        !checked ? 'invisible' : '',
                                        'h-5 w-5 text-main-blue',
                                    )}
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span
                                    className={classnames(
                                        { 'ring-2 ': checked },
                                        'absolute -inset-px pointer-events-none ring-main-blue ring-offset-2 ring-offset-white',
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
