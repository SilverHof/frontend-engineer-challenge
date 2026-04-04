import React from 'react'
import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon'

import type { Preview } from '@storybook/react'

import { STORYBOOK_MOCK_HANDLERS } from '../../src/app/mocks/handlers'

import '../../src/app/styles/index.css'

initialize({
  onUnhandledRequest: 'bypass',
})

const decorators: Preview['decorators'] = [mswDecorator, (Story) => <Story />]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: { handlers: STORYBOOK_MOCK_HANDLERS },
  },
  loaders: [mswLoader],
  decorators: decorators,
}

export default preview
