import React, { useState } from "react";
import { useFoodLog } from "../../api/foodLog/useFoodLog";
import { useFoodItem } from "../../api/foodItem/useFoodItem";

export default function FoodLogModule() {
  const [query, setQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [selectedFdcId, setSelectedFdcId] = useState<string>("");

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchLoading,
  } = useFoodLog(submittedQuery);

  const { data: foodItem } = useFoodItem(selectedFdcId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedQuery(query);
  };

  const handleSelect = (fdcId: string) => {
    setSelectedFdcId(fdcId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-base-100 border w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn">Submit</button>
      </form>
      {isSearchLoading && <p>Loading results...</p>}
      {!isSearchLoading && searchResults?.pages[0].foods.length === 0 && (
        <p>No results found.</p>
      )}
      {!isSearchLoading && searchResults?.pages?.length && (
        <div>
          <ul>
            {searchResults.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.foods.map((food) => (
                  <li key={food.fdcId}>
                    {food?.brandName && <p>{food.brandName}</p>}
                    <p>{food.description}</p>
                    <p>{food.foodCategory}</p>
                    <button
                      className="btn"
                      onClick={() => handleSelect(food.fdcId)}
                    >
                      +
                    </button>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
          <button
            className="btn"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading..."
              : hasNextPage
              ? "Show more results"
              : "No more results"}
          </button>
        </div>
      )}
    </div>
  );
}
