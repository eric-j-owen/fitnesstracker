import { useQuery } from "@tanstack/react-query";
import { getFoodItemById } from "./foodItem.api";
import { FoodItemType } from "../api.types";

export const useFoodItem = (fdcId: number | null) => {
  const foodItemQuery = useQuery({
    queryKey: [fdcId],
    queryFn: () => {
      if (!fdcId) throw new Error("missing fdcid");
      return getFoodItemById(fdcId);
    },
    enabled: !!fdcId,
  });

  return {
    data: foodItemQuery.data as FoodItemType,
    isLoading: foodItemQuery.isPending,
  };
};
