import { v } from "@/shared/lib/valibot";

export const TaskStatusSchema = v.picklist(["todo", "in_progress", "done"]);
export type TaskStatus = v.InferOutput<typeof TaskStatusSchema>;

export const TaskPrioritySchema = v.picklist(["high", "medium", "low"]);
export type TaskPriority = v.InferOutput<typeof TaskPrioritySchema>;

// DB row (snake_case) を受け取り、アプリ型 (camelCase) に変換するスキーマ
export const TaskSchema = v.pipe(
	v.object({
		id: v.string(),
		user_id: v.string(),
		title: v.string(),
		due_date: v.string(),
		status: TaskStatusSchema,
		priority: TaskPrioritySchema,
		is_gcal_synced: v.boolean(),
		created_at: v.string(),
		updated_at: v.string(),
	}),
	v.transform((row) => ({
		id: row.id,
		userId: row.user_id,
		title: row.title,
		dueDate: row.due_date,
		status: row.status,
		priority: row.priority,
		isGcalSynced: row.is_gcal_synced,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	})),
);

// アプリ側で使う型 (camelCase)
// 用途: v.parse(TaskSchema, dbRow) の返り値
export type Task = v.InferOutput<typeof TaskSchema>;

// DB 行の型 (snake_case)
// 用途: API 層で Supabase に書き込む際の型チェック
export type TaskDbRow = v.InferInput<typeof TaskSchema>;
