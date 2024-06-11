import { Component, OnInit } from '@angular/core';
import { AssignmentItem } from 'src/app/interfaces/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-assignments',
    standalone: true,
    templateUrl: './assignments.component.html',
    styleUrl: './assignments.component.css',
    imports: [RedirectButtonComponent, CommonModule]
})
export class AssignmentsComponent implements OnInit {

  assignments: AssignmentItem[];
  loaded: boolean;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.assignmentService.getAll().subscribe({
        next: (response) => {
            this.assignments = response.assignments;
            this.loaded = true;
        }
    });
  }

}
