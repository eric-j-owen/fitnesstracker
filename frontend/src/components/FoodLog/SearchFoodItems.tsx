import { useFoodSearch } from "../../api/foodLog/useFoodLog";
import { useState } from "react";
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
            className="input input-accent w-50 focus:w-full transition-all duration-300 border border-accent rounded-lg"
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
              aria-label="Clear search"
            >
              &times;{" "}
            </button>
          )}
        </div>
      </form>

      <div className="bg-base-100 max-h-120 overflow-y-auto">
        {isSearchLoading ? (
          <>
            <div className="flex flex-col gap-4 w-full">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </>
        ) : (
          <>
            {searchResults && (
              <div className="overflow-x-auto">
                <p className="p-4 text-xs opacity-60">Search results</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Brand</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.pages.map((page) =>
                      page.foods.map((food) => (
                        <tr
                          key={food.fdcId}
                          className="hover:bg-base-300 cursor-pointer"
                          onClick={() => onSelect(food.fdcId)}
                        >
                          <td>{food.description}</td>
                          <td>
                            {food.brandName ? food.brandName : "Unbranded"}
                          </td>
                          <td>{food.foodCategory}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {!isSearchLoading && searchResults?.pages[0].foods.length === 0 && (
        <p>No results found.</p>
      )}

      {/* pagination */}
      {searchResults && searchResults?.pages[0].foods.length > 0 && (
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
      )}
    </div>
  );
}
