import * as v from "valibot";

export const jokeSchema = v.object({
	id: v.pipe(
		v.string("Your id must be a string"),
		v.nonEmpty("Id must not be empty"),
	),
	question: v.pipe(
		v.string("Your question must be a string"),
		v.nonEmpty("Please enter a question"),
		v.minLength(10, "The question must be longer than 10 characters"),
	),
	answer: v.pipe(
		v.string("Your answer must be a string"),
		v.nonEmpty("Please enter an answer"),
		v.minLength(10, "The answer must be longer than 10 characters"),
	),
});

// Schema for adding new jokes (without ID)
export const addJokeSchema = v.object({
	question: v.pipe(
		v.string("Your question must be a string"),
		v.nonEmpty("Please enter a question"),
		v.minLength(10, "The question must be longer than 10 characters"),
	),
	answer: v.pipe(
		v.string("Your answer must be a string"),
		v.nonEmpty("Please enter an answer"),
		v.minLength(10, "The answer must be longer than 10 characters"),
	),
});
