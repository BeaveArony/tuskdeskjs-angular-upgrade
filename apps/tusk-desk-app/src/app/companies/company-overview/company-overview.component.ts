import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-company-overview",
  templateUrl: "./company-overview.component.html",
  styleUrls: ["./company-overview.component.css"]
})
export class CompanyOverviewComponent implements OnInit {
  currentTeamName: any;
  companies: { id: number; name: string; group: string }[];
  private COMPANIES = [
    { id: 1, name: "ABC Corp", group: "tier 1" },
    { id: 2, name: "Priority Gems", group: "tier 1" },
    { id: 3, name: "Disco Distro", group: "tier 2" },
    { id: 4, name: "Nestabout", group: "tier 3" },
    { id: 5, name: "Water Parcel LLC", group: "tier 1" }
  ];

  constructor(@Inject("teamService") private teamService) {}

  ngOnInit() {
    this.companies = this.COMPANIES;
    this.currentTeamName = this.teamService.currentTeam();
  }

  onFilterChanged = ({filter}) => {
    this.companies = this.COMPANIES.filter(t => {
      return filter === "" || t.group === filter;
    });
  };
}
