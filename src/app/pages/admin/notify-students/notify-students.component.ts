import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute } from '@angular/router';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CohortService } from 'src/app/services/cohort.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";

@Component({
    selector: 'app-notify-students',
    standalone: true,
    templateUrl: './notify-students.component.html',
    styleUrls: ['./notify-students.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, EmptyContentComponent, CKEditorModule, ReportBarComponent]
})
export class NotifyStudentsComponent implements OnInit {


  notisGroup: FormGroup;
  formError: string = null;
  submitted: boolean = false;
  created: boolean = false;
  cohort_name: string;
  action_done: string = null;
  action_in_progress: string = null;
  error_in_action: string = null;
  available_attributes: string[] = ['{{first_name}}', '{{last_name}}', '{{email}}'];

  editor = ClassicEditor;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private cohortService: CohortService) {}


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.cohort_name = params['n'];
      
    });


    this.notisGroup = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }


  get location() {
    return `/admin/cohort/${this.cohort_name}`;
  }

  get body() {
    return this.notisGroup.get('body');
  }

  get can_submit() {
    return this.notisGroup.valid;
  }

  onSubmit(form: HTMLFormElement) {
    this.submitted = true;

    this.action_in_progress = 'Sending notification to students...';
    this.action_done = null;
    this.error_in_action = null;

    let form_data = new FormData(form);

    form_data.append('body', this.body.value)

    // setTimeout(() => {
      this.cohortService.notify_students(form_data, this.cohort_name).subscribe({
        next: response => {
          this.submitted = false;
          this.action_in_progress = null;
          if (response.status == 'failed') {
            this.error_in_action = response.message;
            return;
          } else {
            this.error_in_action = null;
            this.action_done = response.message;
          }
        }
      });
      
    // }, 3000);

  }

  async copy(string: string) {
    // try {
      await navigator.clipboard.writeText(string);
    //   document.querySelector('#copy_button').innerHTML = 'Copied';
    // } catch (e) {
    //   document.querySelector('#copy_button').innerHTML = 'Couldn\'t copy';
    // }
  }
}
