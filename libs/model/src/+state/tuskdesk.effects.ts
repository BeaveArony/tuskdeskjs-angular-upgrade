import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AssignTicket, LoadTickets, ResolveTicket, SubmitTicket } from './tuskdesk.actions';
import { ModelState, Ticket, User } from './tuskdesk.interfaces';

const fakeTickets: Ticket[] = [
  {
    id: 100,
    userId: 1,
    assigneeId: null,
    title: 'Set up test env',
    description: 'Some description',
    severity: 'low',
    status: 'unassigned',
    reason: null
  },
  {
    id: 101,
    userId: 1,
    assigneeId: 4,
    title: 'Fix my laptop',
    description: 'Another issue',
    severity: 'low',
    status: 'assigned',
    reason: null
  },
  {
    id: 200,
    userId: 2,
    assigneeId: 3,
    title: 'Fix the issue with prod',
    description: '',
    severity: 'high',
    status: 'assigned',
    reason: null
  }
];

const fakeUsers: { [id: number]: User } = {
  1: { id: 1, name: 'Alice' },
  2: { id: 2, name: 'Bob' },
  3: { id: 3, name: 'Cobb' },
  4: { id: 4, name: 'Don' }
};

function fakeNewTicket(a: SubmitTicket, currentUserId: number): Ticket {
  return {
    id: 1000,
    userId: currentUserId,
    assigneeId: null,
    title: a.payload.title,
    description: a.payload.description,
    severity: a.payload.severity,
    status: 'unassigned',
    reason: null
  };
}

@Injectable()
export class ModelEffects {
  @Effect()
  loadTickets = this.dataPersistence.fetch('LOAD_TICKETS', {
    run(a: LoadTickets, state: ModelState) {
      console.log('Loaded', { tickets: fakeTickets, users: fakeUsers });
      return {
        type: 'TICKETS_LOADED',
        payload: { tickets: fakeTickets, users: fakeUsers }
      };
    },

    onError(a: LoadTickets, error) {
      console.error('Error', error);
    }
  });

  @Effect()
  submitTicket = this.dataPersistence.pessimisticUpdate('SUBMIT_TICKET', {
    run(a: SubmitTicket, state: ModelState) {
      return {
        type: 'TICKET_SUBMITTED',
        payload: fakeNewTicket(a, state.model.currentUserId)
      };
    },

    onError(a: SubmitTicket, error) {
      console.error('Error', error);
    }
  });

  @Effect()
  assignTicket = this.dataPersistence.pessimisticUpdate('ASSIGN_TICKET', {
    run(a: AssignTicket, state: ModelState) {
      return {
        type: 'TICKET_ASSIGNED',
        payload: {
          assigneeId: state.model.currentUserId,
          ticketId: a.payload.ticketId
        }
      };
    },

    onError(a: AssignTicket, error) {
      console.error('Error', error);
    }
  });

  @Effect()
  resolveTicket = this.dataPersistence.pessimisticUpdate('RESOLVE_TICKET', {
    run(a: ResolveTicket, state: ModelState) {
      return { type: 'TICKET_RESOLVED', payload: a.payload };
    },

    onError(a: ResolveTicket, error) {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<ModelState>) {}
}
