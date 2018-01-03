"use strict";

angular.module("tickets").component("ticketOverview", {
  template: `
      <p class="overview-message">Tickets assigned to {{$ctrl.currentUserName}}</p>
      <ticket-list
        class="list"
        [tusk-tickets]="$ctrl.tickets"
        (on-filter-change)="$ctrl.onFilterChanged($event)"></ticket-list>
    `,
  controller: [
    "userService",
    // "store",
    "$injector",
    function(userService, $injector) {
      this.currentUserName = userService.currentUser();
      this._tickets = [
        {
          id: 1,
          title: "Need help with UI",
          submittedBy: "Mary",
          company: "ABC Corp"
        },
        {
          id: 2,
          title: "Submit not working",
          submittedBy: "Ned",
          company: "Priority Gems"
        },
        {
          id: 3,
          title: "How do I upload files?",
          submittedBy: "Bob",
          company: "ABC Corp"
        },
        {
          id: 4,
          title: "Schedule a video call for training",
          submittedBy: "Mary",
          company: "ABC Corp"
        },
        {
          id: 5,
          title: "Minor issue with layout",
          submittedBy: "Jules",
          company: "Priority Gems"
        }
      ];
      this.tickets = this._tickets;

      this.$onInit = () => {
        setTimeout(() => {
          this.store = $injector.get("store");
          this.store.dispatch({ type: "LOAD_TICKETS" });
          // this.tickets$ = this.store.select("tuskdesk", "tickets");
          this.tickets$ = this.store.select(state => state);
          this.subscription = this.tickets$.subscribe(state => console.log('ticket-overview', state));
        }, 0);
      };
      this.$onDestroy = () => {
        this.subscription && this.subscription.unsubscribe();
      };

      this.onFilterChanged = function(filter) {
        this.tickets = this._tickets.filter(function(t) {
          return filter === "" || t.submittedBy === filter;
        });
      };
    }
  ]
});
