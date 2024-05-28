import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CohortItem } from 'src/app/interfaces/cohort';
import { CohortService } from 'src/app/services/cohort.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-cohorts',
    standalone: true,
    templateUrl: './cohorts.component.html',
    styleUrls: ['./cohorts.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})
export class CohortsComponent implements OnInit {
  cohorts!: CohortItem[];
  loaded: boolean = false;

  constructor(private cohortService: CohortService) {}

  ngOnInit(): void {
      this.cohortService.getList().subscribe({
          next: (response) => {
            //   console.log(response)
              this.cohorts = response.cohorts;
              this.loaded = true;
          }
      });
  }

}
