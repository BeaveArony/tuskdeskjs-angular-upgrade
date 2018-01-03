import { ModelAction } from './tuskdesk.actions';
import { Model, Ticket } from './tuskdesk.interfaces';

export function modelReducer(state: Model, action: ModelAction): Model {
  switch (action.type) {
    case 'TICKETS_LOADED': {
      const tickets = action.payload.tickets;
      const users = { ...state.users, ...action.payload.users };
      return { ...state, tickets, users };
    }
    case 'TICKET_SUBMITTED': {
      const tickets = [...state.tickets, action.payload];
      return { ...state, tickets };
    }
    case 'TICKET_ASSIGNED': {
      return {
        ...state,
        tickets: updateItemInArray(
          state.tickets,
          t => t.id === action.payload.ticketId,
          t =>
            <Ticket>{
              ...t,
              status: 'assigned',
              assigneeId: action.payload.assigneeId
            }
        )
      };
    }
    case 'TICKET_RESOLVED': {
      return {
        ...state,
        tickets: updateItemInArray(
          state.tickets,
          t => t.id === action.payload.ticketId,
          t => <Ticket>{ ...t, status: 'resolved', reason: action.payload.reason }
        )
      };
    }
    default: {
      return state;
    }
  }
}

function updateItemInArray<T>(tt: T[], predicate: (t: T) => boolean, fn: (t: T) => T): T[] {
  const matching = tt.filter(predicate)[0];
  if (matching) {
    const index = tt.indexOf(matching);
    return [...tt.slice(0, index), fn(matching), ...tt.slice(index + 1)];
  } else {
    return tt;
  }
}
