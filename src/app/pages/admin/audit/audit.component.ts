import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { AuditService } from 'src/app/services/audit.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { PatchedCourseComponent } from "../../../partials/patched-course/patched-course.component";
import { CourseRecordComponent } from "../../../partials/course-record/course-record.component";

@Component({
    selector: 'app-audit',
    standalone: true,
    templateUrl: './audit.component.html',
    styleUrl: './audit.component.css',
    imports: [CommonModule, EmptyContentComponent, PatchedCourseComponent, CourseRecordComponent]
})
export class AuditComponent implements OnInit {

  object: object;
  fetching: boolean = false;
  error: string = null;
  actor: {first_name: string, last_name: string};
  action_date: string;
  action_name: string;
  object_name: string;

  constructor(private route: ActivatedRoute, private auditService: AuditService) {}

  ngOnInit(): void {
    let id:string;

    this.route.paramMap.subscribe(params => id = atob(params.get('id')));


    this.fetchAuditTrail(id);
  }

  fetchAuditTrail(id: string) {
    this.fetching = true;
    this.auditService.fetchTrail(id).subscribe({
      next: response => {
        console.log(response)
        this.fetching = false;
        if (response.status == 'failed') {
          this.error = response.message;
          return;
        }
        this.handleResponse(response);      
        // console.log(this.object)
      }
    });
  }
  handleResponse(response: { status: string; message?: string; object?: object; actor?: { first_name: string; last_name: string; }; date?: string; action?: string; object_name: string; }) {
    this.object = response.object;
    this.actor = response.actor;
    this.action_date = format(response.date, 'PPPPpp');
    this.action_name = response.action;
    this.object_name = response.object_name;
  }

}
