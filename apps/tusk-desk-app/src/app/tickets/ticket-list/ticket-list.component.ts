import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModelState } from '@tuskdeskjs-angular-upgrade/model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  @Input() tuskTickets;
  @Output() onFilterChange = new EventEmitter();
  notifyList = [];

  tickets = this.store.select('model', 'tickets');

  constructor(@Inject('$rootScope') private rootScope: any, private store: Store<ModelState>) {}

  ngOnInit() {}

  onNotifyAll() {
    this.notifyList = this.tuskTickets.map(function(t) {
      return t.id;
    });
    // we need to force digest to trigger angularjs change detection
    this.rootScope.$digest();
  }

  // we need a method to broker the onFilterChange emit to be able to force digest
  onClearFilter() {
    this.onFilterChange.emit('');
    // we need to force digest to trigger angularjs change detection
    this.rootScope.$digest();
  }

  onSubmittedBySelected(submittedBy) {
    this.onFilterChange.emit(submittedBy);
  }
}
