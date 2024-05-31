'use client'
import React, { useState } from 'react'
import { PiCheck } from "react-icons/pi"

import { CoverageItem, Locale } from '@vcare/type'
import { cn } from '@vcare/helper'

type LPCoverageProps = {
  className?: string
  items?: CoverageItem[]
  labels?: {
    features?: string
  }
  opco?: Locale
}

export const LPCoverage = ({ className, items, labels }: LPCoverageProps) => {
  const [device, setDevice] = useState<string | null>((items && items[0]?.label) ?? null)
  const table = items?.find(item => item.label === device)?.table

  return (
    <section className={cn('max-w-2xl mx-auto', className)}>
      {items && <>
        <div className="flex gap-8 justify-center">
          {items.map(item => <div
            className={`border-2 ${item.label === device ? 'bg-text-color border-text-color text-accent-color' : 'border-accent-color'} cursor-pointer px-6 py-3 rounded-full`}
            key={item.label}
            onClick={() => setDevice(item.label)}
          >{item.labelText}</div>)}
        </div>
        {table && <>
          <table className="border-separate border-spacing-x-1 mt-4 table-fixed w-[42rem]">
            <thead>
              <tr>
                {table.cols.map(col => <td className={`bg-accent-color py-4 rounded-t-lg text-center w-[${100 / table.cols.length}%]`} key={col.label}>{col.labelText}</td>)}
              </tr>
            </thead>
          </table>

          <div className="pt-4">{labels?.features}</div>

          <table className="border border-accent-color border-separate border-spacing-0 mt-1 rounded-lg table-fixed w-[42rem]">
            <tbody>
              <tr>
              </tr>
              {table.rows.map(row => <React.Fragment key={row.label}>
                <tr>
                  <td colSpan={row.checks.length} className="pl-4 pt-4">{row.labelText}</td>
                </tr>
                <tr>
                  {row.checks.map((check, index) => <td className="border-0 border-b" key={index}><div className="flex items-center justify-center py-2">{check ? <PiCheck className="h-6 w-6 text-green-600" /> : null}</div></td>)}
                </tr>
              </React.Fragment>)}
            </tbody>
          </table>
        </>}
      </>}
    </section>
  )
}
