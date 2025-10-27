import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import { SubmitButton } from "./submit";
import { TextField } from "./text";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
