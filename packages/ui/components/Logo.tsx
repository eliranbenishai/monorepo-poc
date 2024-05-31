import { ReactNode } from 'react'
import { IconProps } from '@vcare/type'

import { Mediamarkt } from '../logos/Mediamarkt'
import { Vodafone } from '../logos/Vodafone'

type LogoProps = {
  className?: string
  vendor: string
}

export const Logos: Record<string, (props: IconProps) => ReactNode> = { Mediamarkt, Vodafone }

export const Logo = ({ className, vendor }: LogoProps) => {
  if (!Logos[vendor]) {
    return null
  }

  const VendorLogo = Logos[vendor]!
  return (
    <VendorLogo
      className={className}
    />
  )
}
