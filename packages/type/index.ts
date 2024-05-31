import { HTMLAttributeAnchorTarget } from 'react'
import { DEVICES, LOCALES } from '../const'

export type Locale = typeof LOCALES[number]
export type Device = typeof DEVICES[number]

export type CoverageItem = {
    abstract?: string
    icon?: string
    label: string
    labelText?: string
    table: {
        cols: {
            appendix?: string
            appendixText?: string
            label: string
            labelText?: string
        }[]
        rows: {
            appendix?: string
            appendixText?: string
            label: string
            labelText?: string
            checks: [string | boolean]
        }[]
    }
}

export type DeviceItem = {
    innerModelId: string
    externalModelId: string
    extraExternalModelId: string
    manufacturerId: string
    manufacturerName: string
    modelId: string
    modelName: string
    memoryId: string
    colourId: string
    colourName: string
    deviceType: string
}

export type DeviceItemResponse = {
    error?: Error
    devices?: DeviceItem[]
}

export type DeviceTypeItem = {
    popup?: string
    title: string
}

export type DeviceTypeResponse = {
    error?: Error
    deviceTypes?: DeviceTypeItem[]
}

export type Error = string | null

export type GenericItem = {
    id: string
    name: string
}
export type HeroImage = {
    alt: string
    device?: Device
    height: number
    src: string
    width: number
}
export type HeroItem = {
    icon?: string
    label: string
    labelText?: string
    price?: string
    priceText?: string
}

export type IconProps = {
    className?: string
}

export type Manufacturer = {
    manufacturerId: string
    manufacturerName: string
    deviceTypes: string[]
}

export type ManufacturerResponse = {
    error?: Error
    manufacturers?: Manufacturer[]
}

export type NavItem = {
    key: string
    labelText?: string
    popupText?: string
    target?: HTMLAttributeAnchorTarget
    url?: string
}

export type OfferCoverageItem = {
    comment?: boolean
    description?: boolean
    featured?: boolean
    included: boolean
    label: string
    tags?: string[]
}

export type OfferItem = {
    id: string
    description: string
    monthlyFee: number
    currency: string
    excessFee: number
    excessFee2: number
    promotionValue: number
    promotionMonthsDuration: number
    accidentalDamageCovered: boolean
    fluidsDamageCovered: boolean
    theftCovered: boolean
    documents: {
        descriptionPlan: string
        TAC: string
        IPID: string
        ABOUT: string
    },
    contractDuration: number
    excessType?: string
    promotionType: string
    tags?: string[]
    coverages: OfferCoverageItem[]
}

export type OffersResponse = {
    error?: Error
    offers?: OfferItem[]
}

export type OTTHeader = {
    abstract: string
    title: string
    link: {
        label: string
        url: string
    }
}

export type Vendor = {
    key: string
    colors: {
        primary: string
        secondary?: string
        accent?: string
        offset?: string
    }
    landingPage?: {
        coverage?: CoverageItem[]
        footer?: {
            links?: NavItem[]
        }
        header?: {
            buttons?: NavItem[]
            links?: NavItem[]
        }
        hero?: {
            abstract: boolean
            image: HeroImage
            items?: HeroItem[]
            title?: string
        }
    }
    logo: string
    ott?: {
        coverage: {
            custom: boolean
        }
        details: {
            custom: boolean
        }
        device: {
            custom: boolean
        }
        header?: OTTHeader
        footer?: {
            links?: NavItem[]
        }

    }
}

export type VendorResponse = {
    error?: Error
    vendor?: Vendor
}