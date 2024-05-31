import { Vendor } from '@vcare/type'
import { DEFAULT } from '@/shared/const'

export const getVendors = async (vendor: string): Promise<Vendor> => {
    const response = await fetch(`${process.env['BASE_URL']}/api/vendors?vendor=${vendor}`, { next: { revalidate: 10 } })

    return await response.json()
}