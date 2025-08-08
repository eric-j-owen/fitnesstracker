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
    <div className="relative">
      {/* search bar */}
      <form onSubmit={handleSubmit}>
        <div className="relative my-10">
          <input
            type="text"
            className="input input-accent w-full"
            placeholder="Search for food"
            aria-label="Search for food"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-ghost text-accent absolute right-0"
            onClick={() => setQuery("")}
          >
            x
          </button>
          <button className="btn">Submit</button>
        </div>
      </form>

      {/* loading states */}
      {isSearchLoading && <p>Loading results...</p>}
      {!isSearchLoading && searchResults?.pages[0].foods.length === 0 && (
        <p>No results found.</p>
      )}

      {/* results */}
      {searchResults && (
        <div className="absolute z-20 bg-base-300 shadow-xl max-h-100 overflow-y-auto border border-accent w-full">
          <div className="p-2">
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
          </div>
          {/* pagination */}
          <div className="sticky bottom-0">
            <button
              className="btn btn-block"
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
        </div>
      )}
    </div>
  );
}
