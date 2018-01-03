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
import { ModelModule } from '@tuskdeskjs-angular-upgrade/model';
import { CompanyOverviewComponent } from './companies/company-overview/company-overview.component';
import { CompanyListDirective } from './companies/company-list/company-list.directive';

export function getUserService($injector) {
  return $injector.get('userService');
}

export function getTeamService($injector) {
  return $injector.get('teamService');
}

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ModelModule
  ],
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketCardComponent,
    TicketActivityDirective,
    CompanyOverviewComponent,
    CompanyListDirective
  ],
  entryComponents: [AppComponent, TicketListComponent, TicketCardComponent, CompanyOverviewComponent],
  providers: [
    {
      provide: 'userService',
      useFactory: getUserService,
      deps: ['$injector']
    },
    {
      provide: 'teamService',
      useFactory: getTeamService,
      deps: ['$injector']
    }
  ]
})
export class AppModule {
  ngDoBootstrap(): void {}
}
