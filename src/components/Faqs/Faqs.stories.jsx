import Faqs from './Faqs';
import { useFaqs } from '../../hooks/useFaqs';

const meta = {
  component: Faqs,
};

export default meta;

export const Default = {
  args: {},
  render: () => {
    const { faqs } = useFaqs();
    return <Faqs faqs={faqs} />;
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className='bg-gray-100 p-4'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
