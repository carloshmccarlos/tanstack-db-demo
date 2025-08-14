export default function GithubLink() {
	return (
		<a
			href="https://github.com/carloshmccarlos/tanstack-demo"
			target="_blank"
			rel="noopener noreferrer"
			className=" text-muted-foreground hover:text-foreground transition-colors"
			aria-label="View source on GitHub"
		>
			<img alt="GitHub" src={"github.svg"} width={30} height={30} />
		</a>
	);
}
