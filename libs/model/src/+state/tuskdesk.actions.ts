import { Severity, Ticket, User } from "./model.interfaces";

export interface LoadTickets {
  type: "LOAD_TICKETS";
  payload: {};
}

export interface TicketsLoaded {
  type: "TICKETS_LOADED";
  payload: { tickets: Ticket[]; users: { [id: number]: User } };
}

export interface SubmitTicket {
  type: "SUBMIT_TICKET";
  payload: { title: string; description: string; severity: Severity };
}

export interface TicketSubmitted {
  type: "TICKET_SUBMITTED";
  payload: Ticket;
}

export interface AssignTicket {
  type: "ASSIGN_TICKET";
  payload: { ticketId: number };
}

export interface TicketAssigned {
  type: "TICKET_ASSIGNED";
  payload: { assigneeId: number; ticketId: number };
}

export interface ResolveTicket {
  type: "RESOLVE_TICKET";
  payload: { ticketId: number; reason: string };
}

export interface TicketResolved {
  type: "TICKET_RESOLVED";
  payload: { ticketId: number; reason: string };
}

export type ModelAction =
  | LoadTickets
  | TicketsLoaded
  | SubmitTicket
  | TicketSubmitted
  | AssignTicket
  | TicketAssigned
  | ResolveTicket
  | TicketResolved;
