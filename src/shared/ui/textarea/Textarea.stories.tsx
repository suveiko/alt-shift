import { useState } from 'react';

import { Textarea } from './Textarea';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Multi-line text input with optional character counter, label, and error states. Auto-resizes based on content.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    showCounter: false,
    fullWidth: false,
    label: '',
    placeholder: '',
    error: '',
    maxLength: undefined,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when textarea is empty',
    },
    error: {
      control: 'text',
      description: 'Error state - shows red border and red counter when truthy',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character limit',
    },
    showCounter: {
      control: 'boolean',
      description: 'Shows character count when maxLength is set',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes textarea take full width of container',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
};

const WithCounterComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Textarea
      label="Comment"
      placeholder="Write your comment..."
      value={value}
      onChange={(event) => {
        return setValue(event.target.value);
      }}
      maxLength={200}
      showCounter
    />
  );
};

export const WithCounter: Story = {
  render: () => {
    return <WithCounterComponent />;
  },
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    error: 'error',
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit this',
    disabled: true,
    value: 'This textarea is disabled',
  },
};
