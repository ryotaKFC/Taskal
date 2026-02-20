export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "high" | "medium" | "low";

export interface Database {
	public: {
		Tables: {
			tasks: {
				Row: {
					id: string;
					user_id: string;
					title: string;
					due_date: string;
					status: TaskStatus;
					priority: TaskPriority;
					is_gcal_synced: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					title: string;
					due_date: string;
					status?: TaskStatus;
					priority?: TaskPriority;
					is_gcal_synced?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					title?: string;
					due_date?: string;
					status?: TaskStatus;
					priority?: TaskPriority;
					is_gcal_synced?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
			guest_contacts: {
				Row: {
					id: string;
					user_id: string;
					email: string;
					name: string | null;
				};
				Insert: {
					id?: string;
					user_id: string;
					email: string;
					name?: string | null;
				};
				Update: {
					id?: string;
					user_id?: string;
					email?: string;
					name?: string | null;
				};
			};
			task_guests: {
				Row: {
					task_id: string;
					guest_contact_id: string;
				};
				Insert: {
					task_id: string;
					guest_contact_id: string;
				};
				Update: {
					task_id?: string;
					guest_contact_id?: string;
				};
			};
		};
	};
}
