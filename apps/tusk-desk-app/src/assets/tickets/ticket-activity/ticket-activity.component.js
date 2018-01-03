"use strict";

angular.module("tickets").component("ticketActivity", {
  template: `
      <a class="activity-link"
        ng-click="$ctrl.toggleActivity()"
        ng-class="{open: $ctrl.activityVisible}">
        Activity
      </a>
      <div ng-if="$ctrl.activityVisible">
        <p class="entry" ng-repeat="entry in $ctrl.ticketActivity">{{entry}}</p>
      </div>
    `,
  bindings: {
    tuskTicket: "<"
  },
  controller: [
    "ticketService",
    "store",
    function(ticketService, store) {
      this.activityVisible = false;

      this.tickets = store.select("model", "tickets");

      this.$onChanges = function() {
        this.ticketActivity = ticketService.getActivity(this.tuskTicket.id);
      };

      this.toggleActivity = function() {
        this.activityVisible = !this.activityVisible;
      };
    }
  ]
});
