import { fn } from '@storybook/test';
import { Counter } from '../../components/counter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Primary = {
};
