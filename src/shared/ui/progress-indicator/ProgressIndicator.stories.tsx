import { ProgressIndicator } from './ProgressIndicator';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Visual progress tracker with multiple display variants. Shows current progress towards a goal with accessible labels.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    viewType: 'dots-right',
    current: 0,
    max: 5,
  },
  argTypes: {
    current: {
      control: 'number',
      description: 'Current progress value',
    },
    max: {
      control: 'number',
      description: 'Maximum value (goal)',
    },
    viewType: {
      control: 'select',
      options: ['dots-right', 'tiles-top'],
      description:
        'Visual style - dots with label on right, or tiles with label on top',
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DotsRightEmpty: Story = {
  args: {
    current: 0,
    max: 5,
    viewType: 'dots-right',
  },
};

export const DotsRightPartial: Story = {
  args: {
    current: 3,
    max: 5,
    viewType: 'dots-right',
  },
};

export const DotsRightFull: Story = {
  args: {
    current: 5,
    max: 5,
    viewType: 'dots-right',
  },
};

export const TilesTopEmpty: Story = {
  args: {
    current: 0,
    max: 5,
    viewType: 'tiles-top',
  },
};

export const TilesTopPartial: Story = {
  args: {
    current: 2,
    max: 5,
    viewType: 'tiles-top',
  },
};

export const TilesTopFull: Story = {
  args: {
    current: 5,
    max: 5,
    viewType: 'tiles-top',
  },
};
