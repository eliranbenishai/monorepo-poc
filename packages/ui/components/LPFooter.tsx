import { Locale, NavItem } from '@vcare/type'
import { cn } from '@vcare/helper'

type LPFooterProps = {
  className?: string
  copyright?: string
  links?: NavItem[]
  opco?: Locale
}

export const LPFooter = ({ copyright, className, links }: LPFooterProps) => {
  return (
    <footer
      className={cn('bg-text-color flex flex-column justify-center mt-8 py-8 text-accent-color', className)}
    >
      <section className="max-w-6xl mx-auto">
        {links && <div className="flex gap-8 justify-center">
          {links.map(item => <a key={item.key} href={item.url} target={item.target}>{item.labelText}</a>)}
        </div>}
        <div className="mt-4 text-center text-sm">{copyright}</div>
      </section>
    </footer>
  )
}
