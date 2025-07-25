import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { SubscribeButton } from "~/components/form/components";
import { fieldContext, formContext } from "~/components/form/context";

const TextField = lazy(() => import("./fields"));

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
