import type { AnyFieldApi } from "@tanstack/react-form";
import { useFieldContext } from "~/components/form/context";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<p className="text-sm text-destructive mt-1">
					{field.state.meta.errors.map((e) => e.message).join(", ")}
				</p>
			) : null}
			{field.state.meta.isValidating ? (
				<p className="text-sm text-muted-foreground mt-1">Validating...</p>
			) : null}
		</>
	);
}

export default function TextField({ label }: { label: string }) {
	const field = useFieldContext<string>();
	const hasError = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<div className="w-full">
			{/** biome-ignore lint/a11y/noLabelWithoutControl: <shadcn UI bug i think> */}
			<label className="flex flex-col gap-1.5">
				<div className="text-sm font-medium">{label}</div>
				<Input
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					onBlur={field.handleBlur}
					aria-invalid={hasError}
					className={cn(hasError && "border-destructive")}
				/>
			</label>

			<FieldInfo field={field} />
		</div>
	);
}
