import { useEffect, useState } from "react";

export const useJobDetails = (id) => {
  const [details, setDetails] = useState({});
  const fetchJobDetails = async (jobId) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
    );
    if (response.ok) {
      const result = await response.json();
      setDetails(result);
    }
  };

  useEffect(() => {
    if (id && Object.keys(details).length === 0) {
      console.log("CALLL");
      fetchJobDetails(id);
    }
  }, [id]);

  return { details };
};
