import { Meta, StoryObj } from '@storybook/react'

import { EntityPattern } from './entity-pattern.tsx'

const meta: Meta<typeof EntityPattern> = {
  title: 'Entities/EntityPattern',
  component: EntityPattern,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof EntityPattern>

export const Default: Story = {
  args: {},
}
