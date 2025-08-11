import { useFoodSearch } from "../../api/foodLog/useFoodLog";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

interface SearchFoodItemsProps {
  onSelect: (fdcId: number) => void;
}

export default function SearchFoodItems({ onSelect }: SearchFoodItemsProps) {
  const [query, setQuery] = useState<string>("");
  const [value] = useDebounce(query, 500);

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchLoading,
  } = useFoodSearch(value);

  return (
    <div className="mt-5">
      {/* search bar */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex">
          <input
            type="text"
            className="input input-accent w-50 focus:w-full transition-all duration-300"
            placeholder="🔍 Search for food"
            aria-label="Search for food"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="btn btn-ghost text-accent"
              onClick={() => {
                setQuery("");
              }}
            >
              &times;{" "}
            </button>
          )}
        </div>
      </form>

      {/* loading states */}
      {isSearchLoading && (
        <div className="absolute z-20 bg-base-300 shadow-2xl flex flex-col justify-center items-center border border-accent rounded-lg w-100">
          <div className="loading loading-spinner loading-xl m-10"></div>
          <div className="flex w-100 flex-col gap-4">
            <div className="skeleton h-4 w-75"></div>
            <div className="skeleton h-4 w-75"></div>
            <div className="skeleton h-4 w-75"></div>
            <div className="skeleton h-4 w-75"></div>
          </div>
        </div>
      )}
      {!isSearchLoading && searchResults?.pages[0].foods.length === 0 && (
        <p>No results found.</p>
      )}

      {/* results */}
      {searchResults && (
        <div className="absolute z-20 bg-base-300 shadow-2xl max-h-120 overflow-y-auto w-100 border border-accent rounded-lg">
          <div className="p-2">
            <ul>
              <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Search results
              </li>
              {searchResults.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.foods.map((food) => (
                    <li
                      key={food.fdcId}
                      className="hover:bg-base-100 cursor-pointer p-2 m-2 flex"
                      onClick={() => onSelect(food.fdcId)}
                    >
                      {food?.brandName && <p>{food.brandName}</p>}
                      <p>{food.description}</p>
                      <p>{food.foodCategory}</p>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          </div>
          {/* pagination */}
          <div className="sticky bottom-0">
            <button
              className="btn btn-block text-primary"
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
