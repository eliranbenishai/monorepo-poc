'use client'
import { ReactNode } from 'react'
import { cva } from 'class-variance-authority'

export type DeviceDetailProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'default' | 'disabled' | 'selected'
}

const deviceDetail = cva('border border-black min-w-36 px-4 py-2 rounded-lg', {
  variants: {
    type: {
      default: [
        'bg-transparent',
        'text-text-color',
      ],
      disabled: [
        'bg-gray-500',
        'text-gray-700',
      ],
      selected: [
        'bg-gray-200',
        'border-2',
        'shadow',
        'text-text-color',
      ]
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export const DeviceDetail = ({ children, className, onClick, type = 'default' }: DeviceDetailProps) => {
  return (
    <button
      className={deviceDetail({ type, className })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
