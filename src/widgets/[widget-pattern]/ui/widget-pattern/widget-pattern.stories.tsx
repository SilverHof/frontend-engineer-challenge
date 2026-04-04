import { Meta, StoryObj } from '@storybook/react'

import { WidgetPattern } from './widget-pattern.tsx'

const meta: Meta<typeof WidgetPattern> = {
  title: 'Widgets/WidgetPattern',
  component: WidgetPattern,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof WidgetPattern>

export const Default: Story = {
  args: {},
}
