import { Meta, StoryObj } from '@storybook/react'

import { FeaturePattern } from './feature-pattern.tsx'

const meta: Meta<typeof FeaturePattern> = {
  title: 'Features/FeaturePattern',
  component: FeaturePattern,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FeaturePattern>

export const Default: Story = {
  args: {},
}
