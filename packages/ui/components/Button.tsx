'use client'
import { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@vcare/helper'

type ButtonProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'primary' | 'secondary' | 'ghost'
}

const button = cva('px-4 py-2 rounded-lg', {
  variants: {
    type: {
      primary: [
        'bg-primary-color',
        'text-accent-color',
      ],
      secondary: [
        'bg-secondary-color',
      ],
      ghost: [
        'transparent',
        'text-text-color',
      ]
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

export const Button = ({ children, className, disabled, onClick, type = 'primary' }: ButtonProps) => {
  return (
    <button
      className={cn(button({ type, className }), disabled && ' opacity-50')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
