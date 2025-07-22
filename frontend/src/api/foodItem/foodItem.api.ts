import { fetchClient } from "../client";

export const getFoodItemById = async (fdcId: string) => {
  const res = await fetchClient(`/api/foodItems/${fdcId}`);
  console.log(res);
  return res;
};
