import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Corner radius in px'
    },
    backgroundColor: {
      control: 'color',
      description: 'Override background color'
    },
    textColor: {
      control: 'color',
      description: 'Override text color'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    borderRadius: 6
  }
}

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'md',
    borderRadius: 6
  }
}

export const Outline: Story = {
  args: {
    label: 'Button',
    variant: 'outline',
    size: 'md',
    borderRadius: 6
  }
}

export const Ghost: Story = {
  args: {
    label: 'Button',
    variant: 'ghost',
    size: 'md',
    borderRadius: 6
  }
}

export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
    borderRadius: 4
  }
}

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
    borderRadius: 8
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    disabled: true
  }
}

export const Rounded: Story = {
  args: {
    label: 'Pill Button',
    variant: 'primary',
    size: 'md',
    borderRadius: 50
  }
}
