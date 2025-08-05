import { fetchClient } from "../client";

export const getFoodItemById = async (fdcId: number) => {
  if (!fdcId) throw new Error("missing fdcid");
  return await fetchClient(`/api/foodItems/${fdcId}`);
};
