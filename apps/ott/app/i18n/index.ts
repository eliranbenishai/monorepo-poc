import { Namespace, createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { LOCALES } from '@vcare/const'
import { DEFAULT } from '@/shared/const'

export const getOptions = (lng: string = DEFAULT.LOCALE, ns: string = 'shared') => ({
    // debug: true,
    defaultNS: DEFAULT.NAMESPACE,
    fallbackLng: DEFAULT.LOCALE,
    fallbackNS: DEFAULT.NAMESPACE,
    lng,
    ns,
    supportedLngs: LOCALES,
})

const initI18next = async (lng: string, ns: string) => {
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
        .init(getOptions(lng, ns))
    return i18nInstance
}

export const getTranslation = async (language: string, namespace: Namespace, keyPrefix?: string) => {
    const currentNs = Array.isArray(namespace) ? namespace[0] : namespace
    const i18nextInstance = await initI18next(language, currentNs)
    return {
        t: i18nextInstance.getFixedT(language, currentNs, keyPrefix),
        i18n: i18nextInstance
    }
}