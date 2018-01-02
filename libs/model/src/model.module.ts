import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { modelReducer } from './+state/tuskdesk.reducer';
import { modelInitialState } from './+state/tuskdesk.init';
import { ModelEffects } from './+state/tuskdesk.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tuskdesk', modelReducer, { initialState: modelInitialState }),
    EffectsModule.forFeature([ModelEffects])
  ],
  providers: [ModelEffects]
})
export class ModelModule {}
