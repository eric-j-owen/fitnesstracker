import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FOOD_LOG_KEY, FOOD_SEARCH_KEY, MACROS_KEY } from "../../consts";
import {
  deleteLogEntry,
  getLogByDate,
  logFoodItem,
  patchLogEntry,
  searchFoodItems,
} from "./foodLog.api";
import toast from "react-hot-toast";
import { FoodLogEntry } from "../api.types";

/*
todos
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
    queryKey: [FOOD_LOG_KEY, date.toISOString()],
    queryFn: () => getLogByDate(String(date.toISOString().split("T")[0])),
  });

  return {
    data: query.data,
    isLoading: query.isPending,
  };
};

export const useEditLogs = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FoodLogEntry }) =>
      patchLogEntry(id, data),

    onSuccess: () => {
      toast.success("Log updated successfully");
      queryClient.invalidateQueries({ queryKey: [MACROS_KEY] });
      queryClient.invalidateQueries({ queryKey: [FOOD_LOG_KEY] });
    },

    onError: (err) => {
      toast.error("Failed to update log");
      console.error(err);
    },
  });

  return {
    editLog: mutation.mutateAsync,
  };
};
export const useDeleteLogs = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteLogEntry(id),
    onSuccess: () => {
      toast.success("Log deleted");
      queryClient.invalidateQueries({ queryKey: [MACROS_KEY] });
      queryClient.invalidateQueries({ queryKey: [FOOD_LOG_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to delete");
      console.error(err);
    },
  });

  return {
    deleteLog: mutation.mutateAsync,
  };
};
