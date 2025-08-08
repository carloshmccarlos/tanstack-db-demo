import { Resend } from "resend";

interface Props {
	to: string;
	subject: string;
	text: string;
}

// Make sure to use a default value or throw a clear error if the API key is missing
export async function sendEmail({ to, subject, text }: Props) {
	const resendAPI = process.env.RESEND_API || "";

	if (!resendAPI) {
		throw new Error(
			"Email service configuration is missing. Please contact support at official@ielts-read.space",
		);
	}

	const resend = new Resend(resendAPI);

	try {
		const response = await resend.emails.send({
			from: "i-read-official@ielts-read.space",
			to: to,
			subject: subject,
			html: text,
		});

		return {
			success: true,
			message: "Email sent successfully",
			data: response,
		};
	} catch (error) {
		console.error("Failed to send email:", error);
		throw new Error(
			"Failed to send email. Please try again later or contact support at official@ielts-read.space",
		);
	}
}
