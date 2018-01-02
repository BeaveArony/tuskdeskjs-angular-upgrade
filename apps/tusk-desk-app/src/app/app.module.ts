import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketCardComponent } from './tickets/ticket-card/ticket-card.component';
import { TicketActivityDirective } from './tickets/ticket-activity/ticket-activity.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export function getUserService($injector) {
  return $injector.get('userService');
}

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [AppComponent, TicketListComponent, TicketCardComponent, TicketActivityDirective],
  entryComponents: [AppComponent, TicketListComponent, TicketCardComponent],
  providers: [
    {
      provide: 'userService',
      useFactory: getUserService,
      deps: ['$injector']
    }
  ]
})
export class AppModule {
  ngDoBootstrap(): void {}
}
