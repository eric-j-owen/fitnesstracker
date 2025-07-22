import { useQuery } from "@tanstack/react-query";
import { getFoodItemById } from "./foodItem.api";

export const useFoodItem = (fdcId: string) => {
  const foodItemQuery = useQuery({
    queryKey: [fdcId],
    queryFn: () => getFoodItemById(fdcId),
    enabled: !!fdcId,
  });

  return {
    data: foodItemQuery.data,
  };
};
