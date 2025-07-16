import { fetchClient } from "../client";

export const searchFoodItems = async (query: string, page = 1) => {
  const params = new URLSearchParams({
    query,
    page: String(page),
  });
  const result = await fetchClient(`/api/fooditems/search?${params}`);
  console.log(result);
  return result;
};
