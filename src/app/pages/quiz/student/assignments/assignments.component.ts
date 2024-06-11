import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AssignmentItem } from 'src/app/interfaces/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-assignments',
    standalone: true,
    templateUrl: './assignments.component.html',
    styleUrl: './assignments.component.css',
    imports: [CommonModule, RedirectButtonComponent]
})
export class AssignmentsComponent {
  assignments: AssignmentItem[];
  loaded: boolean;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.assignmentService.getPendingAssignments().subscribe({
        next: (response) => {
            this.assignments = response.assignments;
            this.loaded = true;
        }
    });
  }
}
