import { setupWorker } from 'msw/browser'

import { handlers } from '../__mocks__/handlers.ts'
import { MOCK_HANDLERS } from './handlers.ts'

// Объединяем сгенерированные handlers и кастомные моки
export const worker = setupWorker(...handlers, ...MOCK_HANDLERS)
