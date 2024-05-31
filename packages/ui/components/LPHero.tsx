'use client'
import { ReactNode } from 'react'
import { PiLaptop, PiWatch, PiDeviceMobile, PiDog } from "react-icons/pi"

import { HeroItem, Locale } from '@vcare/type'
import { cn } from '@vcare/helper'
import { Button } from '.'

type LPHeroProps = {
  className?: string
  children?: ReactNode
  items?: HeroItem[]
  labels?: {
    cta?: string
    disclaimer?: string
    title?: string
  }
  opco?: Locale
}

const icons = {
  Dog: PiDog,
  Laptop: PiLaptop,
  Mobile: PiDeviceMobile,
  Smartwatch: PiWatch,
}

export const LPHero = ({ children, className, labels, items }: LPHeroProps) => {
  return (
    <section className={cn('relative', className)}>
      {children}
      {items && <div className="flex flex-col max-w-6xl mx-auto pt-8">
        <h1 className="text-4xl text-center">{labels?.title}</h1>
        <div className="flex gap-12 justify-center mt-8">{items.map(item => {
          const Icon = icons[item.icon as keyof typeof icons]
          return <div className="flex flex-col gap-2 items-center" key={item.label}>
            {item.icon && <span className="p-6 rounded-full shadow-lg"><Icon className="h-6 w-6" /></span>}
            <div className="mt-4">{item.labelText}</div>
            <div className="font-bold">{item.priceText}</div>
          </div>
        })}</div>
        <div className="mt-8 text-center text-sm">{labels?.disclaimer}</div>
        <Button className="mt-4 mx-auto">{labels?.cta}</Button>
      </div>}
    </section>
  )
}
