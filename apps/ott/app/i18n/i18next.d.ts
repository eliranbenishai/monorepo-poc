import 'i18next'

import shared from './locales/en-GB/shared.json'

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'shared'
        resources: {
            shared: typeof shared
        }
    }
}