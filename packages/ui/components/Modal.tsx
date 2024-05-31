'use client'
import { useRef, useEffect, ReactNode } from 'react'
import { PiX } from 'react-icons/pi'
import { cva } from 'class-variance-authority'

import { Button } from './Button'

export type ModalProps = {
    children: ReactNode
    className?: string
    isOpen: boolean
    okLabel?: string
    onClose?: () => void
    onOk?: () => void
    title?: ReactNode
    type?: 'modal' | 'popup'
}

const modal = cva('backdrop:bg-gray-800/50 fixed rounded-xl -translate-y-1/2 z-10', {
    variants: {
        type: {
            modal: '',
            popup: '',
        },
    },
    defaultVariants: {
        type: 'modal',
    },
});

export const Dialog = ({ children, className, isOpen, okLabel, onClose, onOk, title, type }: ModalProps) => {
    const dialogRef = useRef<null | HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])

    const handleClose = () => {
        if (onClose) {
            onClose()
        } else {
            dialogRef.current?.close()
            history.back()
        }
    }

    const handleOk = () => {
        if (onOk) {
            onOk()
        }
        handleClose()
    }

    const dialog: ReactNode | null = isOpen
        ? (
            <dialog ref={dialogRef} className={modal({ type, className })}>
                <div className="w-[500px] max-w-full bg-gray-200 flex flex-col">
                    <div className="flex justify-between mb-4 py-2 px-5">
                        <h1 className="text-2xl grow">{title}</h1>
                        <Button onClick={handleClose} type="ghost"><PiX /></Button>
                    </div>
                    <div className="p-4">
                        {children}
                        <div className="flex flex-row justify-center my-2 pt-4">
                            <Button className="bg-black text-white" onClick={handleOk}>{okLabel ?? 'OK'}</Button>
                        </div>
                    </div>
                </div>
            </dialog>
        ) : null


    return dialog
}