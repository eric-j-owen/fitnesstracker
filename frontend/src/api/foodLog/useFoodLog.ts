import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FOOD_SEARCH_KEY } from "../../consts";
import { searchFoodItems } from "./foodLog.api";

export const useFoodLog = (query: string, page: number = 1) => {
  const searchQuery = useQuery({
    queryKey: [FOOD_SEARCH_KEY, query, page],
    queryFn: () => searchFoodItems(query, page),

    //for pagination
    placeholderData: keepPreviousData,

    //to prevent query from running on pageload
    enabled: !!query,
  });

  return {
    data: searchQuery.data,
  };
};
