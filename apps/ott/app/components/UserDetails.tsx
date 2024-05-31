'use client'
import { Namespace } from 'i18next'
import { PiDeviceMobile, PiInfoFill, PiPhone } from 'react-icons/pi'

import { Button, Card } from '@vcare/ui/components'
import { createT } from '@vcare/helper'

import { SearchParams } from '../[[...vl]]/page'
import { useEffect, useState } from 'react'
import { getDevices, getOffers } from '../../service'
import { DeviceItem, Locale, OfferItem } from '@vcare/type'

export type UserDetailsProps = {
    detailsNs: Namespace<'shared' | 'details'>
    disabled?: boolean
    locale: Locale
    searchParams?: SearchParams
    vendorKey: string
}
export const UserDetails = ({ detailsNs, disabled, locale, searchParams, vendorKey }: UserDetailsProps) => {

    const { colour, manufacturer, model, offer, storage } = searchParams ?? {}
    const [deviceItem, setDeviceItem] = useState<DeviceItem | null>(null)
    const [offerItem, setOfferItem] = useState<OfferItem | null>(null)

    useEffect(() => {
        if (!disabled && manufacturer) {
            getDevices(locale, manufacturer, vendorKey).then(response => {
                if (response.devices) {
                    const device = response.devices.find(item =>
                        item.manufacturerName.toLowerCase() === manufacturer
                        && item.modelId === model
                        && item.memoryId === storage
                        && item.colourName === colour
                    )

                    if (device) {
                        setDeviceItem(device)
                        const { externalModelId, extraExternalModelId, innerModelId } = device
                        getOffers(locale, vendorKey, { externalModelId, extraExternalModelId, innerModelId }).then(offersResponse => {
                            if (offersResponse.offers) {
                                setOfferItem(offersResponse.offers.find(item => item.id === offer) ?? null)
                            }
                        })
                    }
                }
            })
        }
    }, [disabled])

    const t = createT(detailsNs)

    return <Card collapsible={true} disabled={disabled} open={!disabled} title={t('title')}>
        <div className="mx-auto w-[520px]">
            <div className="bg-gray-100 flex gap-4 mt-4 p-2 rounded">
                <PiInfoFill className="mt-1 shrink-0" />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: t('notice') }} />
            </div>

            <div className="flex gap-4 mt-8">
                <div className="grow">
                    <label className="block text-sm">{t('first_name')}</label>
                    <input className="border border-gray-400 px-4 py-2 rounded-lg w-full" />
                </div>
                <div className="grow">
                    <label className="block text-sm">{t('last_name')}</label>
                    <input className="border border-gray-400 px-4 py-2 rounded-lg w-full" />
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <div className="grow">
                    <label className="block text-sm">{t('email')}</label>
                    <input className="border border-gray-400 px-4 py-2 rounded-lg w-full" />
                </div>
                <div className="grow">
                    <label className="flex justify-between text-sm">
                        <span>{t('mobile')}</span>
                        <span>{t('required')}</span>
                    </label>
                    <input className="border border-gray-400 px-4 py-2 rounded-lg w-full" />
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <div className="grow">
                    <label className="block text-sm">{t('imei')}</label>
                    <input className="border border-gray-400 px-4 py-2 rounded-lg w-full" />
                    <div className="mt-2 text-xs">{t('imei_description')}</div>
                    <div className="mt-2 text-xs underline">{t('imei_howto')}</div>
                </div>
            </div>
        </div>

        <div className="bg-gray-100 py-4 mt-4">
            <div className="mx-auto w-[520px]">
                <div className="font-bold">{t('order_summary')}</div>
                <div className="flex font-bold justify-between mt-4 text-lg">
                    <span>{offerItem?.description}</span>
                    <span>{offerItem?.monthlyFee} {offerItem?.currency} / {t('month')}</span>
                </div>

                <div className="bg-slate-200 flex gap-2 items-center mt-4 p-4">
                    <PiDeviceMobile className="text-lg" />
                    <span>{deviceItem?.manufacturerName}</span>
                    <span>{deviceItem?.modelName}</span>
                    <span>{deviceItem?.memoryId}</span>
                    <span>{deviceItem?.colourName}</span>
                </div>
            </div>
        </div>

        <div className="mx-auto w-[520px] mt-4">
            <div className="text-sm">{t('recurring_notice')}</div>

            <Button className="mt-4">{t('accept')}</Button>
        </div>
    </Card>
}