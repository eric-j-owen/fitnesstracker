import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { SubscribeButton } from "./SubscribeButton";
import { FormField } from "./FormField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FormField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
