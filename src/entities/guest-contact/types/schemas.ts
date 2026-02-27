import { v } from "@/shared/lib/valibot";

export const GuestContactSchema = v.pipe(
	v.object({
		id: v.string(),
		user_id: v.string(),
		email: v.string(),
		name: v.nullable(v.string()),
	}),
	v.transform((row) => ({
		id: row.id,
		userId: row.user_id,
		email: row.email,
		name: row.name,
	})),
);

// アプリ側で使う型 (camelCase)
export type GuestContact = v.InferOutput<typeof GuestContactSchema>;

// DB 行の型 (snake_case)
export type GuestContactDbRow = v.InferInput<typeof GuestContactSchema>;
