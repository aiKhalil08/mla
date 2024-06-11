import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HistoryItem } from 'src/app/interfaces/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { format } from 'date-fns';

@Component({
    selector: 'app-assignments-history',
    standalone: true,
    templateUrl: './assignments-history.component.html',
    styleUrl: './assignments-history.component.css',
    imports: [CommonModule, RedirectButtonComponent]
})
export class AssignmentsHistoryComponent implements OnInit {
  assignments: HistoryItem[];
  loaded: boolean;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.assignmentService.getCompletedAssignments().subscribe({
        next: (response) => {
            this.assignments = response.assignments;
            this.loaded = true;
        }
    });
  }

  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy');
  }
}
