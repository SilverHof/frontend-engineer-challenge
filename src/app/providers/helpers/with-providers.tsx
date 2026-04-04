import { WithHeroUi, WithReatom } from '@/app/providers/ui'

import { composeProviders } from './compose-providers.tsx'

export const WithProviders = composeProviders(WithReatom, WithHeroUi)
