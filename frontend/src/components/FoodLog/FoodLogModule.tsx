import { useRef, useState } from "react";
import { useFoodItem } from "../../api/foodItem/useFoodItem";
import Modal from "../Modal";
import LogFoodForm from "./LogFoodForm";
import SearchFoodItems from "./SearchFoodItems";
import FoodLogDisplay from "./FoodLogDisplay";

export default function FoodLogModule() {
  const [selectedFdcId, setSelectedFdcId] = useState<number | null>(null);

  const foodModalRef = useRef<HTMLDialogElement>(null);

  const { data: foodItem, isLoading: loadingFoodItem } =
    useFoodItem(selectedFdcId);

  const handleSelect = (fdcId: number) => {
    setSelectedFdcId(fdcId);
    foodModalRef.current?.showModal();
  };

  const renderModalContent = () => {
    if (loadingFoodItem) return <p>Loading details...</p>;
    if (!foodItem) return <p>Something went wrong...</p>;
    return (
      <LogFoodForm
        modalRef={foodModalRef}
        foodItem={foodItem}
        title="Log Food"
      />
    );
  };

  return (
    <div>
      <SearchFoodItems onSelect={handleSelect} />
      <Modal
        modalId="foodModal"
        modalRef={foodModalRef}
        onClose={() => setSelectedFdcId(null)}
      >
        {renderModalContent()}
      </Modal>

      <FoodLogDisplay date={new Date()} />
    </div>
  );
}
