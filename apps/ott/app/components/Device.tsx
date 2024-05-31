'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createT, getUniqueItems, setQs } from '@vcare/helper'
import { DeviceItem, DeviceTypeItem, GenericItem, Locale, Manufacturer } from '@vcare/type'
import { Button, Card, DeviceDetail, Dialog } from '@vcare/ui/components'

import { getDeviceTypes, getDevices, getManufacturers } from '../../service'
import { Namespace } from 'i18next'

import { SearchParams } from '../[[...vl]]/page'
import { PiCheckCircleFill } from 'react-icons/pi'

export type DeviceProps = {
  locale: Locale
  className?: string
  deviceNs: Namespace<'shared' | 'device'>
  labels: {
    nextStep: string
  }
  onNext: () => void
  searchParams?: SearchParams
  vendorKey: string
}

export const Device = ({ className, deviceNs, labels, locale, onNext, searchParams, vendorKey }: DeviceProps) => {

  const { colour, confirm, deviceType, manufacturer, model, storage } = searchParams ?? {}

  const [colourList, setColourList] = useState<string[] | null>(null)
  const [confirmation, setConfirmation] = useState<boolean>(!!confirm?.includes('device'))
  const [deviceList, setDeviceList] = useState<DeviceItem[] | null>(null)
  const [deviceTypes, setDeviceTypes] = useState<DeviceTypeItem[] | null>(null)
  const [models, setModels] = useState<GenericItem[] | null>(null)
  const [manufacturers, setManufacturers] = useState<Manufacturer[] | null>(null)
  const [open, setOpen] = useState<boolean>(!confirm?.includes('device'))
  const [storageList, setStorageList] = useState<string[] | null>(null)

  const currentDevice = deviceTypes?.find(item => item.title === deviceType)

  const router = useRouter()
  const t = createT(deviceNs)

  useEffect(() => {
    if (!deviceTypes) {
      getDeviceTypes(locale, vendorKey).then(response => {
        if (response.deviceTypes) {
          setDeviceTypes(response.deviceTypes)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (deviceTypes && !manufacturers) {
      getManufacturers(locale, vendorKey).then(response => {
        if (response.manufacturers) {
          setManufacturers(response.manufacturers)
        }
      })
    }
  }, [deviceTypes])

  useEffect(() => {
    if (manufacturer) {
      getDevices(locale, manufacturer, vendorKey).then(response => {
        if (response.devices) {
          setDeviceList(response.devices)
          setModels(getUniqueItems<GenericItem>(response.devices.map(item => ({ id: item.modelId, name: item.modelName })), 'name'))
        }

      })
    }
  }, [manufacturer])

  useEffect(() => {
    if (deviceList && model) {
      setStorageList([...new Set(deviceList.filter(item => item.modelId === model).map(item => item.memoryId))])
    }
  }, [model, deviceList])

  useEffect(() => {
    if (deviceList && storage) {
      setColourList([...new Set(deviceList.filter(item => item.modelId === model && item.memoryId === storage).map(item => item.colourName))])
    }
  }, [storage, deviceList])

  const handleNext = () => {
    setOpen(false)
    if (onNext) {
      onNext()
    }
  }

  return (
    <Card className={className} open={open} title={<div className="flex gap-2 items-center">
      {t('title')}
      {confirm?.includes('device') && <PiCheckCircleFill className="h-8 text-green-600 w-8" />}
    </div>}>
      <div className="mb-4 px-16">
        <div>{t('device_type')}</div>
        {deviceTypes && <div className="flex gap-4 mt-4">
          {deviceTypes.map(item => <Link
            href={`?${setQs([{ key: 'deviceType', value: item.title }])}`}
            key={item.title}
            passHref
            scroll={false}
          >
            <DeviceDetail type={deviceType === item.title ? 'selected' : 'default'}>
              {t(`devices.${item.title}`)}
            </DeviceDetail>
          </Link>
          )}
        </div>}
        {['smartwatch', 'tablet'].includes(deviceType ?? '') && currentDevice && <Dialog
          isOpen={true}
          title={t(`devices.${currentDevice.popup}.title`)}
        >
          <div> Testing 123</div>
          <div> Testing 123</div>
        </Dialog>}

        {deviceType && manufacturers && <div className="my-8">
          <div>{t('device_make')}</div>
          <div className="flex gap-4 overflow-x-auto mt-4">
            {manufacturers.map(item => <Link
              href={`?${setQs([{ key: 'manufacturer', value: item.manufacturerName.toLocaleLowerCase() }], `deviceType=${deviceType}`)}`}
              key={item.manufacturerId}
              passHref
              scroll={false}
            >
              <DeviceDetail
                className="flex flex-col gap-2 items-center py-4"
                type={manufacturer === item.manufacturerName.toLocaleLowerCase() ? 'selected' : 'default'}
              >
                <Image
                  alt={item.manufacturerName}
                  className="h-4"
                  height="15"
                  src={`/images/manufacturers/${item.manufacturerName.toLocaleLowerCase()}-logo.svg`}
                  width="120"
                />
                <div>{item.manufacturerName}</div>
              </DeviceDetail>
            </Link>
            )}
          </div>
        </div>}

        {manufacturer && models && <div className="my-8">
          <div>{t('device_model')}</div>
          <select
            className="border-r-8 border-transparent mt-4 py-2 px-4 outline outline-black rounded w-full"
            onChange={evt => router.push(`?${setQs([{ key: 'model', value: evt.target.value }], location.search)}`, { scroll: false })}
            value={model}
          >
            <option value="">{t('search_model')}</option>
            {models?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>}

        {model && storageList && <div className="my-8">
          <div>{t('device_storage')}</div>
          <div className="flex gap-4 mt-4">
            {storageList.map(item => <Link
              href={`?${setQs([{ key: 'storage', value: item }], location.search)}`}
              key={item}
              passHref
              scroll={false}
            >
              <DeviceDetail type={storage === item ? 'selected' : 'default'}>
                {item}
              </DeviceDetail>
            </Link>
            )}
          </div>
        </div>}

        {model && colourList && <div className="my-8">
          <div>{t('device_colour')}</div>
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {colourList.map(item => <Link
              href={`?${setQs([{ key: 'colour', value: item }], location.search)}`}
              key={item}
              passHref
              scroll={false}
            >
              <DeviceDetail type={colour === item ? 'selected' : 'default'}>
                {item}
              </DeviceDetail>
            </Link>
            )}
          </div>
        </div>}

      </div>

      {colour && <>
        <div className="flex gap-4 items-center my-8 px-16"><PiCheckCircleFill className="h-8 text-green-600 w-8" />{t('device_selection_complete')}</div>
        {/* **DO NOT DELETE NEXT LINE** Initializes classes used in the injected HTML */}
        <div className="hidden list-decimal mx-8 pb-2 underline hover:no-underline" />
        <div className="bg-gray-100 py-8 px-16">
          <div dangerouslySetInnerHTML={{ __html: t('criteria') }} />
          <div className="bg-white border border-gray-300 flex gap-4 px-4 py-2 rounded-lg">
            <input type="checkbox" checked={confirmation} onChange={evt => {
              setConfirmation(evt.target.checked)
            }} />
            {t('criteria_confirmation')}
          </div>
        </div>
        <div className="py-8 px-16" dangerouslySetInnerHTML={{ __html: t('disclaimer') }} />
      </>}

      <Button className="mb-4 mx-16" disabled={!confirmation} onClick={handleNext}>{labels.nextStep}</Button>
    </Card>
  )
}
