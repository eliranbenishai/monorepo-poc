'use client'
import { ReactNode } from 'react'
import { cva } from 'class-variance-authority'

export type BadgeProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'new' | 'popular' | 'default'
}

const badge = cva('px-2 pt-0.5 text-xs rounded-full', {
  variants: {
    type: {
      new: [
        'bg-gray-800',
        'text-accent-color',
      ],
      popular: [
        'bg-red-600',
        'text-accent-color',
      ],
      default: [
        'bg-gray-400',
        'text-text-color',
      ]
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export const Badge = ({ children, className, onClick, type = 'default' }: BadgeProps) => {
  return (
    <div
      className={badge({ type, className })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
