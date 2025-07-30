import { createFormHook } from "@tanstack/react-form";
import { SubscribeButton } from "~/components/form/components";
import { fieldContext, formContext } from "~/components/form/context";
import { PasswordField, TextField } from "~/components/form/fields";

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		TextField,
		PasswordField,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
