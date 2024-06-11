import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Assignment } from 'src/app/interfaces/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-assignment',
    standalone: true,
    templateUrl: './assignment.component.html',
    styleUrl: './assignment.component.css',
    imports: [CommonModule, EmptyContentComponent]
})
export class AssignmentComponent {
  assignment: Assignment;
  fetching: boolean;
  assignment_name: string;
  empty: string = null;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assignment_name = params['name'];
      this.fetchAssignment();
    })
  }

  fetchAssignment() {
    this.fetching = true;
    this.assignmentService.getAssignment(this.assignment_name).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'empty') {
          this.empty = response.message;
          return;
        }
        this.assignment = response.assignment;
      }
  });
  }

  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy');
  }
}
