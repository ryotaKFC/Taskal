import type { Database } from "./database.types";

export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
export type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

export type GuestContact =
	Database["public"]["Tables"]["guest_contacts"]["Row"];
export type GuestContactInsert =
	Database["public"]["Tables"]["guest_contacts"]["Insert"];
export type GuestContactUpdate =
	Database["public"]["Tables"]["guest_contacts"]["Update"];

export type TaskGuest = Database["public"]["Tables"]["task_guests"]["Row"];
export type TaskGuestInsert =
	Database["public"]["Tables"]["task_guests"]["Insert"];
export type TaskGuestUpdate =
	Database["public"]["Tables"]["task_guests"]["Update"];
