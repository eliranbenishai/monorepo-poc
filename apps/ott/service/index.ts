import { DeviceItemResponse, DeviceTypeResponse, Locale, ManufacturerResponse, OffersResponse, VendorResponse } from '@vcare/type'
import { DEFAULT } from '@/shared/const'


export const getDevices = async (opco: Locale, manufacturer: string, vendor: string, api?: string): Promise<DeviceItemResponse> => {
    let response = null
    if (!process.env['NEXT_PUBLIC_USE_MOCKS']) {
        response = await (await fetch(api || `https://api.eshop-eu.care.cps-partnersnp.de/devices/manufacturers?opco=${opco}`)).json()
    } else {
        response = await require(`../app/api/mocks/manufacturersData-${manufacturer}-${vendor}.json`)
    }

    return {
        devices: response
    }
}

export const getDeviceTypes = async (opco: Locale, vendor: string, api?: string): Promise<DeviceTypeResponse> => {
    let response = null
    if (!process.env['NEXT_PUBLIC_USE_MOCKS']) {
        response = await (await fetch(api || `https://api.eshop-eu.care.cps-partnersnp.de/devices/manufacturers?opco=${opco}`)).json()
    } else {
        response = await require(`../app/api/mocks/device-types-${vendor}.json`)
    }

    return {
        deviceTypes: response.data
    }
}

export const getManufacturers = async (opco: Locale, vendor: string, flow: string = 'DEFAULT', api?: string): Promise<ManufacturerResponse> => {
    let response = null
    if (!process.env['NEXT_PUBLIC_USE_MOCKS']) {
        response = await (await fetch(api || `https://api.eshop-eu.care.cps-partnersnp.de/devices/manufacturers?opco=${opco}&flow=${flow}`)).json()
    } else {
        response = await require(`../app/api/mocks/manufacturers-${vendor}.json`)
    }

    return {
        manufacturers: response.data
    }
}

export const getVendors = async (vendor: string): Promise<VendorResponse> => {
    let err: string | null = null
    const response = await fetch(
        `${process.env['BASE_URL']}/api/vendors?vendor=${vendor || DEFAULT.VENDOR}`,
        { next: { revalidate: 10 } }
    ).catch((e) => {
        err = e.message
    })

    return {
        error: err,
        vendor: await response?.json()
    }
}

export const getOffers = async (opco: Locale, vendor: string, device: {
    externalModelId: string
    extraExternalModelId: string
    innerModelId: string
}, flow: string = 'DEFAULT', api?: string): Promise<OffersResponse> => {
    let response = null
    if (!process.env['NEXT_PUBLIC_USE_MOCKS']) {
        response = await (await fetch(api || `https://api.eshop-eu.care.cps-partnersnp.de/devices/manufacturers?opco=${opco}&flow=${flow}`)).json()
    } else {
        response = await require(`../app/api/mocks/offers-${vendor}.json`)
    }

    return {
        offers: response.data
    }
}