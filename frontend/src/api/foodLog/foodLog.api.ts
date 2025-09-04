import {
  FoodItemType,
  CreateFoodLogEntry,
  FoodLogResponse,
  EditFoodLogEntry,
} from "../api.types";
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

export const logFoodItem = async (foodEntry: CreateFoodLogEntry) => {
  return await fetchClient("/api/foodlog", {
    method: "POST",
    body: JSON.stringify(foodEntry),
  });
};

export const getLogByDate = (date: string): Promise<FoodLogResponse[]> => {
  return fetchClient(`/api/foodlog?date=${date}`);
};

export const patchLogEntry = (id: number, data: EditFoodLogEntry) => {
  return fetchClient(`/api/foodlog/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteLogEntry = (id: number) => {
  return fetchClient(`/api/foodlog/${id}`, {
    method: "DELETE",
  });
};
