CREATE TABLE "liked" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"joke_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "liked" ADD CONSTRAINT "liked_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "liked" ADD CONSTRAINT "liked_joke_id_joke_id_fk" FOREIGN KEY ("joke_id") REFERENCES "public"."joke"("id") ON DELETE cascade ON UPDATE no action;