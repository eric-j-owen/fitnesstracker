import { FoodItemType, FoodLogReqBody } from "../api.types";
import { fetchClient } from "../client";

interface SearchResponse {
  foods: FoodItemType[];
  nextCursor?: number;
}

export const searchFoodItems = async ({
  query,
  pageParam,
}: {
  query: string;
  pageParam: number;
}): Promise<SearchResponse> => {
  const params = new URLSearchParams({
    query,
    page: String(pageParam),
  });
  const result: SearchResponse = await fetchClient(
    `/api/fooditems/search?${params}`
  );
  return result;
};

export const logFoodItem = async (foodEntry: FoodLogReqBody) => {
  return await fetchClient("/api/foodlog", {
    method: "POST",
    body: JSON.stringify(foodEntry),
  });
};
