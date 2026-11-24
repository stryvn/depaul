CREATE TABLE IF NOT EXISTS `alumni` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`show_email_publicly` integer DEFAULT false NOT NULL,
	`batch_year` integer NOT NULL,
	`class_or_stream` text NOT NULL,
	`admission_number` text,
	`occupation` text NOT NULL,
	`organization` text,
	`city` text NOT NULL,
	`country` text DEFAULT 'India' NOT NULL,
	`linkedin_url` text,
	`bio` text,
	`message` text,
	`avatar_url` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`admin_notes` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `alumni_email_unique` ON `alumni` (`email`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`category` text DEFAULT 'Statutory' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`file_url` text NOT NULL,
	`file_type` text DEFAULT 'PDF' NOT NULL,
	`file_size` text DEFAULT '1.0 MB' NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`date` text DEFAULT '' NOT NULL,
	`downloads_count` integer DEFAULT 0 NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `documents_slug_unique` ON `documents` (`slug`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `stories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`category` text DEFAULT '' NOT NULL,
	`cover_image` text NOT NULL,
	`published_at` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `stories_slug_unique` ON `stories` (`slug`);