import { fetchClient } from "../client";

interface FoodItem {
  fdcId: string;
  description: string;
  brandName?: string;
}

interface ApiResponse {
  foods: FoodItem[];
  nextCursor?: number;
}

export const searchFoodItems = async ({
  query,
  pageParam,
}: {
  query: string;
  pageParam: number;
}): Promise<ApiResponse> => {
  const params = new URLSearchParams({
    query,
    page: String(pageParam),
  });
  const result: ApiResponse = await fetchClient(
    `/api/fooditems/search?${params}`
  );
  console.log(result);
  return result;
};
