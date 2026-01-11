import { Input } from './Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text input field with label, error states, and validation support. Fully accessible with ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    fullWidth: false,
    label: '',
    placeholder: '',
    error: '',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    error: {
      control: 'text',
      description: 'Error state - shows red border when truthy',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes input take full width of container',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'error',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
  },
};
