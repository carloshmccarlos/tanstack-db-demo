import { formOptions } from "@tanstack/form-core";
import { Link } from "@tanstack/react-router";
import { Mail, User } from "lucide-react";
import { useAppForm } from "~/components/form/hook";
import { signInWithEmail } from "~/lib/auth/sign-in";
import { signUpWithEmail } from "~/lib/auth/sign-up";
import { deleteUser, getUserByEmail } from "~/serverFn/userServerFn";
import { userLoginSchema, userRegisterSchema } from "~/validation/schema";
import type {
	authSearchParams,
	UserLogin,
	UserRegister,
	UserSelect,
} from "~/validation/types";

export default function AuthForm({ type }: authSearchParams) {
	let formOpts = {};

	if (type === "login") {
		formOpts = formOptions({
			defaultValues: {
				email: "",
				password: "",
			},
			validators: {
				onChange: userLoginSchema,
			},
			onSubmit: async ({ value }: { value: UserLogin }) => {
				await signInWithEmail(value);
			},
		});
	} else if (type === "register") {
		formOpts = formOptions({
			defaultValues: {
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
			},
			validators: {
				onChange: userRegisterSchema,
			},
			onSubmit: async ({ value }: { value: UserRegister }) => {
				const existingUser: UserSelect = (await getUserByEmail({
					data: value.email,
				})) as UserSelect;

				if (existingUser && !existingUser.emailVerified) {
					await deleteUser({ data: value.email });
				}

				await signUpWithEmail(value);
			},
		});
	} else {
		// Default fallback to prevent undefined values
		formOpts = formOptions({
			defaultValues: {
				email: "",
				password: "",
			},
		});
	}

	const form = useAppForm(formOpts);

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">
					{type === "login" ? "Welcome Back" : "Create an Account"}
				</h1>
				<p className="text-muted-foreground mt-1">
					{type === "login"
						? "Sign in to access your account"
						: "Fill in the details to get started"}
				</p>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
			>
				{type === "register" && (
					<form.AppField name="name">
						{(field) => (
							<field.TextField
								label="Name"
								placeholder="Enter your name"
								icon={<User className="h-[18px] w-[18px]" />}
							/>
						)}
					</form.AppField>
				)}

				<form.AppField name="email">
					{(field) => (
						<field.TextField
							label="Email"
							placeholder="Enter your email"
							type="email"
							icon={<Mail className="h-[18px] w-[18px]" />}
						/>
					)}
				</form.AppField>

				<form.AppField name="password">
					{(field) => (
						<field.PasswordField
							label="Password"
							placeholder="Enter your password"
						/>
					)}
				</form.AppField>

				{type === "register" && (
					<form.AppField
						name="confirmPassword"
						validators={{
							onChangeListenTo: ["password"],
							onChange: ({ value, fieldApi }) => {
								if (value !== fieldApi.form.getFieldValue("password")) {
									return { message: "password do not match" };
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<field.PasswordField
								label="Confirm Password"
								placeholder="Confirm your password"
							/>
						)}
					</form.AppField>
				)}

				<div className="pt-2">
					<form.AppForm>
						<div className="flex flex-col gap-3">
							<form.SubscribeButton
								label={type === "login" ? "Sign In" : "Create Account"}
								variant="default"
							/>

							<div className="text-center text-sm text-muted-foreground">
								{type === "login" ? (
									<p>
										Don't have an account?{" "}
										<Link
											to={"/auth"}
											search={{ type: "register" }}
											className="cursor-pointer font-medium text-primary hover:underline"
										>
											Sign up
										</Link>
									</p>
								) : (
									<p>
										Already have an account?{" "}
										<Link
											to={"/auth"}
											search={{ type: "login" }}
											className="cursor-pointer font-medium text-primary hover:underline"
										>
											Sign in
										</Link>
									</p>
								)}
							</div>
						</div>
					</form.AppForm>
				</div>
			</form>
		</div>
	);
}
