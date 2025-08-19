import * as v from "valibot";

export const jokeSchema = v.object({
	id: v.pipe(v.string(), v.nonEmpty("Id must not be empty")),
	question: v.pipe(
		v.string(),
		v.nonEmpty("Please enter a question"),
		v.minLength(10, "The question must be longer than 10 characters"),
	),
	answer: v.pipe(
		v.string(),
		v.nonEmpty("Please enter an answer"),
		v.minLength(10, "The answer must be longer than 10 characters"),
	),
});

// Schema for adding new jokes (without ID)
export const addJokeSchema = v.object({
	question: v.pipe(
		v.string(),
		v.nonEmpty("Please enter a question"),
		v.minLength(10, "The question must be longer than 10 characters"),
	),
	answer: v.pipe(
		v.string(),
		v.nonEmpty("Please enter an answer"),
		v.minLength(10, "The answer must be longer than 10 characters"),
	),
});

export const userRegisterSchema = v.object({
	name: v.pipe(
		v.string(),
		v.nonEmpty("Please enter a name"),
		v.regex(/^[a-zA-Z]/, "Your name must start with a letter"),
	),
	email: v.pipe(
		v.string(),
		v.nonEmpty("Please enter an email"),
		v.email("Please enter a valid email"),
	),
	password: v.pipe(
		v.string(),
		v.nonEmpty("Password must be a string"),
		v.minLength(8, "The minimum length must be 10 characters"),
		v.maxLength(16, "The password must be shorter than 16 characters"),
	),
	confirmPassword: v.pipe(
		v.string(),
		v.nonEmpty("Password must be a string"),
		v.minLength(8, "The minimum length must be 10 characters"),
		v.maxLength(16, "The password must be shorter than 16 characters"),
	),
});

export const userLoginSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty("Please enter an email"),
		v.email("Please enter a valid email"),
	),
	password: v.pipe(v.string(), v.nonEmpty("Please enter a password")),
});

export const authSearchSchema = v.object({
	type: v.picklist(["login", "register"]),
});

export const likeJokeSchema = v.object({
	id: v.string(),
	userId: v.string(),
	jokeId: v.string(),
	createdAt: v.date(),
});
