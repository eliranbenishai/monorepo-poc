'use client'
import { ReactNode } from 'react'
import { Locale } from '@vcare/type'
import { cn } from '@vcare/helper'

export type HeaderProps = {
  children: ReactNode
  className?: string
  logo: ReactNode
  opco?: Locale
}

export const Header = ({ className, logo, children }: HeaderProps) => {
  return (
    <header
      className={cn('flex flex-col items-center justify-center max-w-6xl mx-auto py-4', className)}
    >
      {logo}
      {children}
    </header>
  )
}
