import {
  Directive,
  Input,
  ElementRef,
  Injector,
  Output,
  EventEmitter
} from "@angular/core";
import { UpgradeComponent } from "@angular/upgrade/static";

@Directive({
  selector: "company-list"
})
export class CompanyListDirective extends UpgradeComponent {
  @Input() tuskCompanies;
  @Output() onFilterChange = new EventEmitter();

  constructor(ref: ElementRef, inj: Injector) {
    super("companyList", ref, inj);
  }
}
