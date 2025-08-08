CREATE TABLE "joke" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "jokes" CASCADE;