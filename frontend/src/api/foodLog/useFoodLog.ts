import { useInfiniteQuery } from "@tanstack/react-query";
import { FOOD_SEARCH_KEY } from "../../consts";
import { searchFoodItems } from "./foodLog.api";

export const useFoodLog = (query: string) => {
  const searchQuery = useInfiniteQuery({
    queryKey: [FOOD_SEARCH_KEY, query],
    queryFn: ({ pageParam = 0 }) => searchFoodItems({ query, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: Infinity,

    //to prevent query from running on pageload
    enabled: !!query,
  });

  return {
    data: searchQuery.data,
    searchError: searchQuery.isError,
    fetchNextPage: searchQuery.fetchNextPage,
    hasNextPage: searchQuery.hasNextPage,
    isFetchingNextPage: searchQuery.isFetchingNextPage,
  };
};
