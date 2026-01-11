import { Button } from './Button';
import PlusIcon from '../../assets/plus-icon.svg?react';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary button component for user actions. Supports variants, loading states, icons, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    loading: false,
    disabled: false,
    iconOnly: false,
    fullWidth: false,
    variant: 'filled',
    size: 'md',
    children: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'transparent', 'outline'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading indicator and disables interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Hides text, shows only icon (requires leftIcon)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes button take full width of container',
    },
    leftIcon: {
      control: false,
      description: 'Icon displayed on the left side of the button',
    },
    rightIcon: {
      control: false,
      description: 'Icon displayed on the right side of the button',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    children: 'Transparent',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading',
  },
};

export const WithIcon: Story = {
  args: {
    leftIcon: <PlusIcon />,
    children: 'Create',
  },
};

export const IconOnly: Story = {
  args: {
    leftIcon: <PlusIcon />,
    iconOnly: true,
  },
};
