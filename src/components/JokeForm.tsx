import { eq } from "@tanstack/db";
import { useLiveQuery } from "@tanstack/react-db";
import { Suspense } from "react";
import { toast } from "sonner";
import { useAppForm } from "~/components/form/hook";
import { createJoke, updateJoke } from "~/db/actions";
import { jokeCollection } from "~/db/collections";
import { addJokeSchema } from "~/validation/schema";

export default function JokeForm({ id }: { id?: string }) {
	const { data } = useLiveQuery((q) =>
		q.from({ joke: jokeCollection }).where(({ joke }) => eq(joke.id, id)),
	);

	const joke = data?.[0];

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
				if (joke) {
					const updatedValue = {
						...value,
						id: joke.id,
					};
					updateJoke(updatedValue);
				} else {
					const newValue = {
						...value,
						id: "",
					};
					createJoke(newValue);
				}

				toast.success(`Joke ${operation} successfully.`);
				form.reset();
			} catch (error) {
				console.error(`Failed to ${operation} joke:`, error);
				toast.error(`Failed to ${operation} joke. Please try again.`);
			} finally {
			}
		},
	});

	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center p-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			}
		>
			<div className="max-w-2xl mx-auto p-6">
				<div className="bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden">
					<div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-border/50">
						<div className="flex items-center gap-3">
							<div className="text-3xl">🎭</div>
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-card-foreground">
									{joke ? "Edit Your Joke" : "Create a New Joke"}
								</h2>
								<p className="text-muted-foreground mt-1">
									{joke
										? "Update your hilarious joke"
										: "Share your best jokes with the community"}
								</p>
							</div>
						</div>
					</div>

					<form
						className="p-8 space-y-6"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit().then();
						}}
					>
						<div className="space-y-6">
							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium text-card-foreground flex items-center gap-2">
									<span className="text-lg">❓</span>
									Setup (Question)
								</label>
								<form.AppField name="question">
									{(field) => (
										<field.TextField
											label={""}
											placeholder="What's the setup for your joke?"
										/>
									)}
								</form.AppField>
							</div>

							<div className="space-y-2">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="text-sm font-medium text-card-foreground flex items-center gap-2">
									<span className="text-lg">😂</span>
									Punchline (Answer)
								</label>
								<form.AppField name="answer">
									{(field) => (
										<field.TextField
											label={""}
											placeholder="What's the hilarious punchline?"
										/>
									)}
								</form.AppField>
							</div>
						</div>

						<form.AppForm>
							<div className="flex justify-end pt-4 border-t border-border/50">
								<form.SubscribeButton label={`✨ ${label}`} variant="default" />
							</div>
						</form.AppForm>
					</form>
				</div>
			</div>
		</Suspense>
	);
}
