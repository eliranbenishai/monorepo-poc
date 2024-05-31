import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const createT = (ns: any) => {
  return (key: string, values?: Record<string, string | number | null | undefined>) => {
    return key.split('.').reduce((object, keyIndex) => {
      if (object) {
        let value = object[keyIndex]
        if (value) {
          if (typeof value === 'string' && values) {
            Object.keys(values).forEach(valueKey => {
              value = value.replaceAll(`{{${valueKey}}}`, values[valueKey])
            })
          }
          return value
        }
        return key
      }
    }, ns)
  }
}

export const getUniqueItems = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] =>
  [...new Map(arr.map((item: T) => [item[key], item])).values()]

export const setQs = (items: { key: string, value: string | null }[], qs: string = location.search) => {
  const query = new URLSearchParams(qs)

  items.forEach(item => {
    if (item.value === null) {
      query.delete(item.key)
    } else {
      query.set(item.key, item.value)
    }
  })
  return query.toString()
}
