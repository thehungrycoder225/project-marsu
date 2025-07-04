import { config } from 'chai';
import 'tailwindcss/tailwind.css';

const preview = {
  parameters: {
    layout: 'centered',

    controls: {
      matchers: {
        color: /(background|color)$/,
        date: /Date$/,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',

      options: {},
    },
  },
  globals: {
    a11y: {
      // Optional flag to prevent the automatic check
      manual: true,
    },
  },
};

export default preview;
