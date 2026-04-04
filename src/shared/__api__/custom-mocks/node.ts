import { setupServer } from 'msw/node'

import { MOCK_HANDLERS } from './handlers.ts'

export const server = setupServer(...MOCK_HANDLERS)
