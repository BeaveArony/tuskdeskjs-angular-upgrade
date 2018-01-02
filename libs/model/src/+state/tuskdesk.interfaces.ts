// export interface Tuskdesk {
//   // define state here
// }

// export interface TuskdeskState {
//   readonly tuskdesk: Tuskdesk;
// }
export type Severity = "low" | "high";
export type Status = "unassigned" | "assigned" | "resolved";

export interface Ticket {
  readonly id: number;
  readonly userId: number;
  readonly assigneeId: number;
  readonly title: string;
  readonly description: string;
  readonly reason: string;
  readonly severity: Severity;
  readonly status: Status;
}

export interface User {
  readonly id: number;
  readonly name: string;
}

export interface Model {
  readonly tickets: Ticket[];
  readonly users: { [id: number]: User };
  readonly currentUserId: number;
}

export interface ModelState {
  readonly model: Model;
}
