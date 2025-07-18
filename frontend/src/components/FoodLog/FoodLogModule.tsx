import React, { useState } from "react";
import { useFoodLog } from "../../api/foodLog/useFoodLog";

export default function FoodLogModule() {
  const [query, setQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchLoading,
  } = useFoodLog(submittedQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedQuery(query);
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
      {!isSearchLoading && data?.pages[0].foods.length === 0 && (
        <p>No results found.</p>
      )}
      {!isSearchLoading && data?.pages?.length && (
        <div>
          <ul>
            {data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.foods.map((food) => (
                  <li key={food.fdcId}>
                    {food?.brandName && <p>{food.brandName}</p>}
                    <p>{food.description}</p>
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
