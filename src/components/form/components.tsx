import { useFormContext } from "~/components/form/context";
import LoadingSpinner from "~/components/LoadingSpinner";
import { Button } from "~/components/ui/button";

export function SubscribeButton({
	label,
	variant = "default",
}: {
	label: string;
	variant?:
		| "default"
		| "outline"
		| "destructive"
		| "secondary"
		| "ghost"
		| "link";
}) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					variant={variant}
					type="submit"
					disabled={isSubmitting}
					className="min-w-[100px]"
				>
					{isSubmitting ? (
						<>
							<LoadingSpinner />
							<span>Submitting</span>
						</>
					) : (
						label
					)}
				</Button>
			)}
		</form.Subscribe>
	);
}
