import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FOOD_LOG_KEY, FOOD_SEARCH_KEY, MACROS_KEY } from "../../consts";
import { getLogByDate, logFoodItem, searchFoodItems } from "./foodLog.api";
import toast from "react-hot-toast";

/*
todos
  change log food query key to include logged date
  update log mutation invalidation to include that date
*/

export const useFoodSearch = (query: string) => {
  const searchQuery = useInfiniteQuery({
    queryKey: [FOOD_SEARCH_KEY, query],
    queryFn: ({ pageParam = 1 }) => searchFoodItems({ query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: Infinity,

    //to prevent query from running on pageload
    enabled: !!query,
  });

  return {
    data: searchQuery.data,
    searchError: searchQuery.isError,
    isSearchLoading: searchQuery.isLoading,
    fetchNextPage: searchQuery.fetchNextPage,
    hasNextPage: searchQuery.hasNextPage,
    isFetchingNextPage: searchQuery.isFetchingNextPage,
  };
};

export const useLogFood = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logFoodItem,
    onSuccess: () => {
      toast.success("Metric logged successfully");
      queryClient.invalidateQueries({ queryKey: [MACROS_KEY] });
      queryClient.invalidateQueries({ queryKey: [FOOD_LOG_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to log");
      console.error(err);
    },
  });

  return {
    logFood: mutation.mutate,
    isLogging: mutation.isPending,
    logError: mutation.error,
  };
};

export const useGetLogs = (date: Date) => {
  const query = useQuery({
    queryKey: [FOOD_LOG_KEY],
    queryFn: () => getLogByDate(date),
  });

  return {
    data: query.data,
    isLoading: query.isPending,
  };
};
