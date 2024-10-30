ALTER TABLE "tasks" ADD COLUMN "desird_weekly_frequency" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "dsird_weekly_frequency";