import { useRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import { toast } from "sonner";
import { useAppForm } from "~/components/form/hook";
import { addJoke, updateJoke } from "~/serverFn/jokesServerFn";
import { addJokeSchema } from "~/validation/schema";
import type { JokeSelect } from "~/validation/types";

interface Props {
	joke?: JokeSelect;
}

export default function JokeForm({ joke }: Props) {
	const router = useRouter();

	const label = joke ? "Update Joke" : "Add Joke";
	const operation = joke ? "update" : "add";

	const form = useAppForm({
		defaultValues: {
			question: joke?.question || "",
			answer: joke?.answer || "",
		},
		validators: {
			onChange: addJokeSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				let id: string;
				if (joke) {
					const updatedValue = {
						...value,
						id: joke.id,
					};
					id = await updateJoke({ data: updatedValue });
				} else {
					id = await addJoke({ data: value });
				}

				if (id) {
					toast.success(`Joke ${operation} successfully: ${id}`);
					form.reset();
				} else {
					toast.error(`Failed to ${operation} joke. Please try again.`);
				}
			} catch (error) {
				console.error(`Failed to ${operation} joke:`, error);
				toast.error(`Failed to ${operation} joke. Please try again.`);
			} finally {
				router.invalidate();
			}
		},
	});

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<form
				className="max-w-md w-full mx-auto space-y-6 rounded-lg border p-6 shadow-sm"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<div className="mb-2 text-center">
					<h2 className="text-2xl font-semibold tracking-tight">
						Add a New Joke
					</h2>
					<p className="text-sm text-muted-foreground">
						Share your best jokes with the community
					</p>
				</div>

				<div className="space-y-4">
					<form.AppField name="question">
						{(field) => <field.TextField label={"Question"} />}
					</form.AppField>

					<form.AppField name="answer">
						{(field) => <field.TextField label={"Answer"} />}
					</form.AppField>
				</div>

				<form.AppForm>
					<div className="flex justify-end">
						<form.SubscribeButton label={label} variant="default" />
					</div>
				</form.AppForm>
			</form>
		</Suspense>
	);
}
