import { headers } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { LOCALES } from '@vcare/const'
import { LPCoverage, LPFooter, LPHeader, LPHero, Logo } from '@vcare/ui/components'
import { getVendors } from '@/service'
import { DEFAULT } from '@/shared/const'
import { Locale } from '@vcare/type'

import { getTranslation } from '../i18n'

type HomeParams = {
  params: {
    vl?: [string, Locale]
  }
}

const Home = async ({ params: { vl } }: HomeParams) => {
  const device = headers().get('x-device')

  let [vendorKey, locale] = vl ?? [DEFAULT.VENDOR, DEFAULT.LOCALE as Locale]
  vendorKey = vendorKey ?? DEFAULT.VENDOR
  locale = LOCALES.find(item => item === locale) ?? DEFAULT.LOCALE

  const currentLang: Locale = LOCALES.find(item => item === locale) ?? DEFAULT.LOCALE

  const { colors, landingPage, logo } = await getVendors(vendorKey)

  if (!landingPage) {
    return notFound()
  }

  const { coverage, footer, header, hero } = landingPage

  const { t } = await getTranslation(locale, 'shared')

  return (
    <>
      <style>{`
      :root {
        ${Object.keys(colors).map(key => `--vcare-color-${key}: ${colors[key as keyof typeof colors]};`).join('\n')}
      }
    `}</style>
      <main className="text-text-color">

        {header && <LPHeader
          buttons={header.buttons?.map(item => ({ ...item, labelText: t(`header.${item.key}`) }))}
          links={header.links?.map(item => ({ ...item, labelText: t(`header.${item.key}`) }))}
          logo={<Logo className="h-12" vendor={logo} />}
          opco={currentLang}
        />}

        {hero && <LPHero
          items={hero.items?.map(item => ({
            ...item,
            labelText: t(`hero.${item.label}`),
            priceText: t(`hero.${item.price}`),
          }))}
          labels={{
            cta: t(`hero.${vendorKey}.cta`),
            disclaimer: t(`hero.${vendorKey}.disclaimer`),
            title: t(`hero.${vendorKey}.items_title`),
          }}
          opco={currentLang}
        >
          {hero.image && <div className="relative">
            {hero.abstract &&
              <h1 className="absolute font-bold left-1/2 text-4xl text-accent-color top-1/2 -translate-x-1/2 -translate-y-1/2">
                {t(`hero.${vendorKey}.abstract`)}
              </h1>
            }
            <Image alt={hero.image.alt} className="w-full" key={hero.image.src} height={hero.image.height} src={hero.image.src} width={hero.image.width} />
          </div>}
        </LPHero>}

        {coverage && <LPCoverage
          className="mt-12"
          items={coverage.map(device => ({
            ...device,
            labelText: t(`coverage.${device.label}`),
            table: {
              cols: device.table.cols.map(col => ({
                ...col,
                appendixText: t(`coverage.${col.appendix}`),
                labelText: t(`coverage.${col.label}`),
              })),
              rows: device.table.rows.map(row => ({
                ...row,
                appendixText: t(`coverage.${row.appendix}`),
                labelText: t(`coverage.${row.label}`),
              })),
            }
          }))}
          labels={{
            features: t('coverage.features')
          }}
        />}

        {footer && <LPFooter
          copyright={t('footer.copyright')}
          links={footer.links?.map(item => ({
            ...item,
            labelText: t(`footer.items.${item.key}`),
            url: t(`footer.items.${item.url}`)
          }))}
        />}

        <sub>Device: {device}</sub>
      </main>
    </>
  )
}

export default Home
