import StarRating from "../../components/star-rating";
import { useState } from "react";


export default {
  title: 'Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
};

export const Primary = {
  render: ({ max }) => {
    const [currentRating, setCurrentRating] = useState(0)

    return (<div>
      <StarRating current={currentRating} max={max} onSelect={setCurrentRating} />
    </div>)
  },
  args: {
    max: 5
  }
};
