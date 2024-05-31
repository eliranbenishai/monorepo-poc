'use client'
import { useEffect, useState } from 'react'
import { Namespace } from 'i18next'

import { createT, setQs } from '@vcare/helper'
import { Locale, OfferItem } from '@vcare/type'
import { Badge, BadgeProps, Button, Card, Dialog } from '@vcare/ui/components'

import { SearchParams } from '../[[...vl]]/page'
import { getDevices, getOffers } from '../../service'
import { PiCaretDown, PiCheckBold, PiCheckCircleFill, PiCircle, PiPlusBold, PiQuestion, PiRadioButtonFill, PiTagLight, PiXBold } from 'react-icons/pi'
import { CoverageItem } from './CoverageItem'
import { useRouter } from 'next/navigation'

export type CoverageProps = {
  locale: Locale
  className?: string
  coverageNs: Namespace<'shared' | 'coverage'>
  disabled?: boolean
  labels: {
    nextStep: string
  }
  onNext: () => void
  searchParams?: SearchParams
  vendorKey: string
}

export const Coverage = ({ className, coverageNs, disabled = false, labels, locale, onNext, searchParams, vendorKey }: CoverageProps) => {
  const { colour, confirm, manufacturer, model, offer, storage } = searchParams ?? {}
  const [offers, setOffers] = useState<OfferItem[] | null>(null)
  const [offerId, setOfferId] = useState<string | null>(offer ?? null)
  const [popup, setPopup] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(!disabled && !confirm?.includes('coverage'))
  const [openPanel, setOpenPanel] = useState<string[]>([])

  const router = useRouter()
  const t = createT(coverageNs)

  useEffect(() => {
    if (!disabled && manufacturer) {
      setOpen(true)
      getDevices(locale, manufacturer, vendorKey).then(response => {
        if (response.devices) {
          const device = response.devices.find(item =>
            item.manufacturerName.toLowerCase() === manufacturer
            && item.modelId === model
            && item.memoryId === storage
            && item.colourName === colour
          )

          if (device) {
            const { externalModelId, extraExternalModelId, innerModelId } = device
            getOffers(locale, vendorKey, { externalModelId, extraExternalModelId, innerModelId }).then(offersResponse => {
              if (offersResponse.offers) {
                setOffers(offersResponse.offers)
              }
            })
          }
        }
      })
    }
  }, [disabled])

  const handleNext = () => {
    setOpen(false)
    if (onNext) {
      onNext()
    }
  }

  return (
    <Card className={className} disabled={disabled} open={open} title={<div className="flex gap-2 items-center">
      {t('title')}
      {confirm?.includes('coverage') && <PiCheckCircleFill className="h-8 text-green-600 w-8" />}
    </div>}>
      {offers?.map(offer => <div className={`${offer.id === offerId ? 'bg-gray-100 border-2 border-black' : 'border border-dashed border-gray-600'} mb-8 mx-auto py-4 relative rounded w-[520px]`} key={offer.id}>
        {offer.tags && <div className="absolute flex gap-4 left-4 -top-2.5">
          {offer.tags.map(item => <Badge className="capitalize" key={item} type={item as keyof BadgeProps['type']}>{t(item)}</Badge>)}
        </div>}

        <div className="px-4">
          <Button className="flex items-center justify-between px-0 text-lg w-full" onClick={() => {
            setOfferId(offer.id)
            router.push(`?${setQs([{ key: 'offer', value: offer.id.toString() }])}`, { scroll: false })
          }} type="ghost">
            {offer.description}
            {offer.id === offerId ? <PiRadioButtonFill /> : <PiCircle />}
          </Button>
          <div className="font-bold text-lg text-red-600">{offer.monthlyFee} {offer.currency}</div>
          <div className="text-sm text-gray-500">{t('per_month')}</div>

          <div className="flex gap-2 items-center mt-4"><PiTagLight /> <span className="font-bold">{t(`promotion.${offer.promotionType}.label`, { monthlyFee: offer.monthlyFee, promotionValue: offer.promotionValue })}</span></div>
          <div className="text-gray-500 text-sm">{t(`promotion.${offer.promotionType}.description`, { monthlyFee: offer.monthlyFee, promotionValue: offer.promotionValue })}</div>
          {offer.excessType && <div className="mt-4">
            <div>{t(`excess.${offer.excessType}.label`, { excessFee: offer.excessFee })} <Button className="py-0 px-1" onClick={() => setPopup(offer.excessType ?? null)} type="ghost"><PiQuestion /></Button></div>
            <div>{t(`excess.${offer.excessType}.description`)}</div>
            {popup === offer.excessType && <Dialog
              isOpen={popup === offer.excessType}
              onClose={() => setPopup(null)}
              title={t(`excess.${offer.excessType}.popup_title`)}
            >
              {t(`excess.${offer.excessType}.popup_content`)}
            </Dialog>}
          </div>}
        </div>

        <div className={`bg-gray-100 px-4 mt-4 ${openPanel.includes(offer.id) ? 'hidden' : ''}`}>
          {offer.coverages.filter(item => item.featured).map(coverage => <div className="flex gap-2 items-center" key={coverage.label}>
            <PiPlusBold className="h-3" />
            <CoverageItem className="py-2 grow" key={coverage.label} coverage={coverage} coverageNs={coverageNs} />
          </div>)}
        </div>

        <div className="px-4 mt-4">
          <Button className="flex gap-2 items-center px-0" onClick={() => setOpenPanel(panels => panels.includes(offer.id) ? panels.filter(panel => panel !== offer.id) : [...panels, offer.id])} type="ghost">
            {t('whats_included')} <PiCaretDown className={`transition-transform ${openPanel.includes(offer.id) ? ' rotate-180' : ''}`} />
          </Button>
          <div className={`overflow-hidden transition-all ${openPanel.includes(offer.id) ? 'h-auto' : 'h-0'}`}>
            {offer.coverages.filter(item => item.included).map(coverage => <div className="flex gap-2 items-center" key={coverage.label}>
              <PiCheckBold />
              <CoverageItem className="py-2 grow" key={coverage.label} coverage={coverage} coverageNs={coverageNs} />
            </div>)}
            <div className="border-0 border-b border-b-gray-300 mb-4 pb-4" />
            {offer.coverages.filter(item => !item.included).map(coverage => <div className="flex gap-2 items-center" key={coverage.label}>
              <PiXBold />
              <CoverageItem className="py-2 grow" key={coverage.label} coverage={coverage} coverageNs={coverageNs} />
            </div>)}
          </div>
        </div>
      </div>)}

      {offerId && <div className="mt-4 mx-auto w-[520px]" dangerouslySetInnerHTML={{ __html: t('disclaimer') }} />}

      <div className="mt-4 mx-auto w-[520px]">
        <Button className="my-4" disabled={!offerId} onClick={handleNext}>{labels.nextStep}</Button>
      </div>
    </Card >
  )
}
