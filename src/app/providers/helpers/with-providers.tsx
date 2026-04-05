import { WithHeroUi } from '@/app/providers/ui'

import { composeProviders } from './compose-providers.tsx'

export const WithProviders = composeProviders(WithHeroUi)
