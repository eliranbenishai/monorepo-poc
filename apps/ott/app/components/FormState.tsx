'use client'
import { Namespace } from 'i18next'
import { useRouter } from 'next/navigation'

import { setQs } from '@vcare/helper'
import { Locale } from '@vcare/type'

import { SearchParams } from '../[[...vl]]/page'

import { Coverage, Device, UserDetails } from '.'


export type FormStateProps = {
    coverageNs: Namespace<'shared' | 'coverage'>
    detailsNs: Namespace<'shared' | 'details'>
    deviceNs: Namespace<'shared' | 'device'>
    labels: {
        nextStep: string
    }
    locale: Locale
    searchParams?: SearchParams
    vendorKey: string
}

export const FormState = ({ coverageNs, detailsNs, deviceNs, labels, locale, searchParams, vendorKey }: FormStateProps) => {

    const router = useRouter()

    return <>
        <Device
            className="mb-4"
            deviceNs={deviceNs}
            labels={labels}
            locale={locale}
            onNext={() => router.push(`?${setQs([{ key: 'confirm', value: 'device' }], location.search)}`, { scroll: false })}
            searchParams={searchParams}
            vendorKey={vendorKey}
        />

        <Coverage
            className="mb-4"
            coverageNs={coverageNs}
            disabled={!searchParams?.confirm?.includes('device')}
            labels={labels}
            locale={locale}
            onNext={() => router.push(`?${setQs([{ key: 'confirm', value: 'device,coverage' }], location.search)}`, { scroll: false })}
            searchParams={searchParams}
            vendorKey={vendorKey}
        />

        <UserDetails
            detailsNs={detailsNs}
            disabled={!searchParams?.confirm?.includes('coverage')}
            locale={locale}
            searchParams={searchParams}
            vendorKey={vendorKey}
        />
    </>
}