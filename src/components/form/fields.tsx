import type { AnyFieldApi } from "@tanstack/react-form";
import { Eye, EyeOff, Lock } from "lucide-react";

import { useState } from "react";
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

export function TextField({
	label,
	placeholder,
	type,
	icon,
}: {
	label: string;
	placeholder?: string;
	type?: string;
	icon?: React.ReactNode;
}) {
	const field = useFieldContext<string>();

	return (
		<div className="w-full">
			{/** biome-ignore lint/a11y/noLabelWithoutControl: <shadcn UI bug i think> */}
			<label className="flex flex-col gap-1.5">
				<div className="text-sm font-medium">{label}</div>
				<div className="relative">
					{icon && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
							{icon}
						</div>
					)}
					<Input
						type={type}
						value={field.state.value || ""}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						placeholder={placeholder}
						className={cn(icon && "pl-10")}
					/>
				</div>
			</label>

			<FieldInfo field={field} />
		</div>
	);
}

export function PasswordField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="w-full">
			<label className="flex flex-col gap-1.5">
				<div className="text-sm font-medium">{label}</div>
				<div className="relative">
					<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
						<Lock className="h-[18px] w-[18px]" />
					</div>
					<Input
						type={showPassword ? "text" : "password"}
						value={field.state.value || ""}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						placeholder={placeholder}
						className="pl-10 pr-10"
					/>
					<button
						type="button"
						className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
			</label>

			<FieldInfo field={field} />
		</div>
	);
}
