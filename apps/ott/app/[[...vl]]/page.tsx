import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { LOCALES } from '@vcare/const'
import { LPFooter, Logo } from '@vcare/ui/components'
import { getVendors } from '@/service'
import { DEFAULT } from '@/shared/const'
import { Device, Locale } from '@vcare/type'

import { getTranslation } from '../i18n'
import { Header, FormState } from '../components'

export type SearchParams = {
  colour?: string
  confirm?: string[]
  deviceType?: Device
  manufacturer?: string
  model?: string
  offer?: string
  storage?: string
}

type HomeParams = {
  params: {
    vl?: [string, Locale]
  },
  searchParams: SearchParams
}

const Home = async ({ params: { vl }, searchParams }: HomeParams) => {
  let [vendorKey, locale] = vl ?? [DEFAULT.VENDOR, DEFAULT.LOCALE as Locale]
  vendorKey = vendorKey ?? DEFAULT.VENDOR
  locale = LOCALES.find(item => item === locale) ?? DEFAULT.LOCALE

  const currentLang: Locale = LOCALES.find(item => item === locale) ?? DEFAULT.LOCALE
  const vendor = await getVendors(vendorKey)

  if (!vendor || vendor.error || !vendor.vendor) {
    return notFound()
  }

  const { colors, ott, logo } = vendor.vendor
  if (!ott) {
    return notFound()
  }

  const { header, footer } = ott

  const { t } = await getTranslation(locale, 'shared')

  return (
    <>
      <style>{`
      :root {
        ${Object.keys(colors).map(key => `--vcare-color-${key}: ${colors[key as keyof typeof colors]};`).join('\n')}
      }
    `}</style>
      <main className="text-text-color bg-gray-100">

        <section className="max-w-3xl mx-auto mb-8">
          {header && <Header
            logo={<Logo className="h-12" vendor={logo} />}
            opco={currentLang}
          >
            {header.title && <h2 className="font-bold mt-10 text-4xl">{t(`header.${vendorKey}.${header.title}`)}</h2>}
            {header.abstract && <Trans i18nKey={`header.${vendorKey}.${header.abstract}` as any}>
              <p className="font-bold mt-8">text</p>
              <p className="mt-8">text</p>
              <p className="my-8">text</p>
            </Trans>}
            {header.link && <Link href={t(`header.${vendorKey}.link.url`)} target="_blank">{t(`header.${vendorKey}.link.label`)}</Link>}
          </Header>}

          <FormState
            coverageNs={t(`coverage.${ott.coverage.custom ? vendorKey : 'default'}`, { returnObjects: true })}
            detailsNs={t(`details.${ott.details.custom ? vendorKey : 'default'}`, { returnObjects: true })}
            deviceNs={t(`device.${ott.device.custom ? vendorKey : 'default'}`, { returnObjects: true })}
            labels={{
              nextStep: t('shared.next_step')
            }}
            locale={locale}
            searchParams={searchParams}
            vendorKey={vendorKey}
          />
        </section>

        {footer && <LPFooter
          copyright={t(`footer.${vendorKey}.copyright`)}
          links={footer.links?.map(item => ({
            ...item,
            labelText: t(`footer.${vendorKey}.items.${item.key}`),
            url: t(`footer.${vendorKey}.items.${item.url}`)
          }))}
        />}

      </main>
    </>
  )
}

export default Home
