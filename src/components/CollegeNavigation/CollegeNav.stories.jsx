import CollegeNav from './CollegeNav';
import { useScrollPosition } from '../../hooks/hooks';

const meta = {
  component: CollegeNav,
};

export default meta;

export const Default = {
  render: () => <CollegeNav />,
  name: 'Default',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-gray-50'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    scrollPosition: {
      control: {
        type: 'number',
      },
    },
  },
};

// Accesibility test

export const AccessibilityTest = {
  render: () => <CollegeNav />,
  name: 'Accessibility Test',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-gray-50'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    scrollPosition: {
      control: {
        type: 'number',
      },
    },
  },
};
export const CollegeNavWithScroll = {
  render: () => <CollegeNav scrollPosition={100} />,
  name: 'College Nav with Scroll',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-gray-50'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    scrollPosition: {
      control: {
        type: 'number',
      },
    },
  },
};
