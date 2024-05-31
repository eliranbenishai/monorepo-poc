import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const vendorKey = request.nextUrl.searchParams.get('vendor')
    const vendor = await import(`./${vendorKey}.json`)
    return Response.json(vendor)
}