import { useFoodSearch } from "../../api/foodLog/useFoodLog";
import React, { useState } from "react";

/*
todos
    styles 
    debouncing
    accessability
    skeleton loading
    error state
    clear search button? 
*/

interface SearchFoodItemsProps {
  onSelect: (fdcId: number) => void;
}

export default function SearchFoodItems({ onSelect }: SearchFoodItemsProps) {
  const [query, setQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchLoading,
  } = useFoodSearch(submittedQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedQuery(query);
  };
  return (
    <div>
      {/* search bar */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-base-100 border w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn">Submit</button>
      </form>

      {/* loading states */}
      {isSearchLoading && <p>Loading results...</p>}
      {!isSearchLoading && searchResults?.pages[0].foods.length === 0 && (
        <p>No results found.</p>
      )}

      {/* results */}
      {searchResults && (
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
                      onClick={() => onSelect(food.fdcId)}
                    >
                      +
                    </button>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>

          {/* pagination */}
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
