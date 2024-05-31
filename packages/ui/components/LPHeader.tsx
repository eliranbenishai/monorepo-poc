'use client'
import { ReactNode } from 'react'
import { NavItem, Locale } from '@vcare/type'
import { cn } from '@vcare/helper'

import { Button } from './Button'

type LPHeaderProps = {
  buttons?: NavItem[]
  className?: string
  links?: NavItem[]
  logo: ReactNode
  opco?: Locale
}

export const LPHeader = ({ buttons, className, links, logo }: LPHeaderProps) => {
  return (
    <header
      className={cn('flex gap-10 items-center max-w-6xl mx-auto py-4', className)}
    >
      {logo}
      {links && <ul className="flex gap-4 grow">
        {links.map(item => <li className="text-xl cursor-pointer" key={item.key}>{item.labelText}</li>)}
      </ul>}
      {buttons && <div className="flex gap-4 shrink-0">
        {buttons.map(item => <Button
          key={item.key}
          onClick={() => {
            window.open(item.url, item.target)
          }}
        >{item.labelText}</Button>)}
      </div>}
    </header>
  )
}
