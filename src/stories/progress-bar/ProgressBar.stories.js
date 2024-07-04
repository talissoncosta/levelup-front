import {ProgressBar} from "../../components/progress-bar";
import "../../components/progress-bar/styles.css";


export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export const Primary = {
  render: () => (
    <div className="storybook-container">
      <ProgressBar current={-20} />
      <ProgressBar current={1} />
      <ProgressBar current={20} />
      <ProgressBar />
      <ProgressBar current={99} />
      <ProgressBar current={130} />
    </div>
  )
};
