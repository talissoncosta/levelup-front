import { useEffect, useState } from "react";

export const useJobsList = ({ page = 1, pageSize = 6 }) => {
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const canLoadMore = list.length >= page * pageSize;
  console.log({ l: list.length, page, pageSize, r: page * pageSize });
  const fetchJobsList = async () => {
    setIsLoading(true);
    const jobsIds = list;
    if (!jobsIds || jobsIds.length === 0) {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json",
      );

      if (response.ok) {
        const result = await response.json();
        setList(result);
      } else {
        setHasError(true);
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchJobsList();
  }, []);

  useEffect(() => {
    setCurrentList(list.slice(0, page * pageSize));
  }, [page, list]);

  return { list: currentList, canLoadMore, isLoading, hasError };
};
