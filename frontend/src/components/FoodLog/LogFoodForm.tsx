import { FoodItemType } from "../../api/api.types";
import { useAppForm } from "../Form/form-context";

interface LogFoodFormProps {
  food: FoodItemType;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function LogFoodForm({ food, modalRef }: LogFoodFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const form = useAppForm({
    defaultValues: {
      amount: 1,
      unit: "g",
      mealCategory: "Other",
      logDate: today,
    },

    validators: {
      //   onChange: ,
    },

    onSubmit: async ({ value }) => {
      modalRef.current?.close();
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
