import React, { useRef, useState } from "react";
import { useFoodLog } from "../../api/foodLog/useFoodLog";
import { useFoodItem } from "../../api/foodItem/useFoodItem";
import Modal from "../Modal";
import LogFoodForm from "./LogFoodForm";

export default function FoodLogModule() {
  const [query, setQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [selectedFdcId, setSelectedFdcId] = useState<number>();

  const foodModalRef = useRef<HTMLDialogElement>(null);

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchLoading,
  } = useFoodLog(submittedQuery);

  const { data: foodItem, isLoading: loadingFoodItem } =
    useFoodItem(selectedFdcId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedQuery(query);
  };

  const handleSelect = (fdcId: number) => {
    setSelectedFdcId(fdcId);
  };

  const renderModalContent = () => {
    if (loadingFoodItem) return <p>Loading details...</p>;
    if (!foodItem) return <p>Something went wrong...</p>;
    return <LogFoodForm modalRef={foodModalRef} foodEntry={foodItem} />;
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
          <Modal modalId="foodModal" modalRef={foodModalRef}>
            {renderModalContent()}
          </Modal>
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
                      onClick={() => {
                        foodModalRef.current?.showModal();
                        handleSelect(food.fdcId);
                      }}
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
