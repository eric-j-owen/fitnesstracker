import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FOOD_SEARCH_KEY, MACROS_KEY } from "../../consts";
import { logFoodItem, searchFoodItems } from "./foodLog.api";
import toast from "react-hot-toast";

export const useFoodLog = (query: string) => {
  const queryClient = useQueryClient();

  const searchQuery = useInfiniteQuery({
    queryKey: [FOOD_SEARCH_KEY, query],
    queryFn: ({ pageParam = 1 }) => searchFoodItems({ query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: Infinity,

    //to prevent query from running on pageload
    enabled: !!query,
  });

  const logEntry = useMutation({
    mutationFn: logFoodItem,
    onSuccess: () => {
      toast.success("Metric logged successfully");
      queryClient.invalidateQueries({ queryKey: [MACROS_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to log metric");
      console.error(err);
    },
  });

  return {
    // searching
    data: searchQuery.data,
    searchError: searchQuery.isError,
    isSearchLoading: searchQuery.isLoading,
    fetchNextPage: searchQuery.fetchNextPage,
    hasNextPage: searchQuery.hasNextPage,
    isFetchingNextPage: searchQuery.isFetchingNextPage,

    // logging
    logFood: logEntry.mutate,
    isLogging: logEntry.isPending,
    logError: logEntry.error,
  };
};
