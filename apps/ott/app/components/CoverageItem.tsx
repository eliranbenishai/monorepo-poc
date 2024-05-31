'use client'
import { Namespace } from 'i18next'
import { useState } from 'react'
import { PiQuestion } from 'react-icons/pi'

import { OfferCoverageItem } from '@vcare/type'
import { Badge, BadgeProps, Button, Dialog } from '@vcare/ui/components'
import { cn, createT } from '@vcare/helper'

export type CoverageItemProps = {
    className?: string
    coverage: OfferCoverageItem
    coverageNs: Namespace<'shared' | 'coverage'>
}

export const CoverageItem = ({ className, coverage, coverageNs }: CoverageItemProps) => {
    const [popup, setPopup] = useState<string | null>(null)

    const t = createT(coverageNs)

    return <div className={cn('flex justify-between', className)}>
        <div>{t(`coverages.${coverage.label}`)}</div>
        <div className="flex gap-2 items-center">
            {coverage.tags?.map(tag => <Badge key={tag} type={tag as keyof BadgeProps['type']}>{t(tag)}</Badge>)}
            <Button className="p-0" onClick={() => setPopup(coverage.label)} type="ghost"><PiQuestion /></Button>
        </div>
        {coverage.description && popup === coverage.label && <Dialog
            isOpen={popup === coverage.label}
            onClose={() => setPopup(null)}
            title={t(`coverages.${coverage.label}`)}
        >
            {t(`coverages.${coverage.label}_description`)}
        </Dialog>}
    </div>
}