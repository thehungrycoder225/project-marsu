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
      <div className="bg-gray-50">
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
