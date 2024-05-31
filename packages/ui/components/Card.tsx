'use client'
import { ReactNode, useEffect, useState } from 'react'
import { PiCaretDown } from "react-icons/pi"

import { cn } from '@vcare/helper'

import { Button } from './Button'

export type CardProps = {
  children: ReactNode
  className?: string
  collapsible?: boolean
  disabled?: boolean
  open?: boolean
  title?: ReactNode
}

export const Card = ({ children, className, collapsible = true, disabled = false, open = true, title }: CardProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <div className={cn('bg-white rounded shadow-lg', disabled && 'opacity-50', className)}>
      {title && <div className="flex items-center p-4">
        <div className="grow">
          {title}
        </div>
        {collapsible && <Button type="ghost" onClick={() => !disabled && setIsOpen(state => !state)}>
          <PiCaretDown className={cn('transition-transform', isOpen && 'rotate-180')} />
        </Button>}
      </div>}
      <div className={cn('border-0 border-t border-t-gray-200 h-auto overflow-hidden py-4 transition-all', !isOpen && 'h-0 py-0')}>
        {children}
      </div>
    </div>
  )
}
