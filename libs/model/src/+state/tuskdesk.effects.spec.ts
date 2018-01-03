import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot, readAll, readFirst } from '@nrwl/nx/testing';
import { of } from 'rxjs/observable/of';

import { ModelEffects } from './tuskdesk.effects';

describe('ModelEffects', () => {
  let actions;
  let effects: ModelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [ModelEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(ModelEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_TICKETS' } });

      const res = await readFirst(effects.loadTickets);
      expect(res.type).toEqual('TICKETS_LOADED');
    });
  });
});
