/*
Requirements
1. The page should show 6 jobs on initial load with a button to load more postings.
2. Clicking on the "Load more" button will load the next page of 6 postings. The button does not appear if there aren't any more postings to load.
3. If there's a url field returned for the job details, make the job title a link that opens the job details page in a new window when clicked.
4. The timestamp can be formatted in any way you like.
 */
import { useJobsList } from "./useJobsList";
import { useJobDetails } from "./useJobDetails";
import { useState } from "react";

const Card = ({ id }) => {
  const {
    details: { title },
  } = useJobDetails(id);

  return <div>{title}</div>;
};

export const JobBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { list, canLoadMore, isLoading } = useJobsList({ page: currentPage });

  console.log({ canLoadMore });
  return (
    <div className="container">
      <div className="list" aria-live="polite">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          list.map((id) => <Card key={id} id={id} />)
        )}
      </div>
      <div>
        {canLoadMore && list.length > 0 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            {isLoading ? "Loading..." : "Load more jobs"}
          </button>
        )}
      </div>
    </div>
  );
};
