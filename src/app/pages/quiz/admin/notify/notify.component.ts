
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { QuizService } from 'src/app/services/quiz.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';

type AssignedStudent = {first_name: string, last_name: string; email: string, company: {name: string}, id: number, selected?: boolean};

@Component({
    selector: 'app-notify',
    standalone: true,
    templateUrl: './notify.component.html',
    styleUrl: './notify.component.css',
    imports: [ReactiveFormsModule, CKEditorModule, ReportBarComponent, CommonModule, RedirectButtonComponent, MatSlideToggle, MatChipsModule]
})
export class NotifyComponent implements OnInit {

  notify_all_users_control: FormControl;
  assigned_students: AssignedStudent[] = [];
  assigned_students_fetched: boolean = false;
  notisGroup: FormGroup;
  formError: string = null;
  submitted: boolean = false;
  sent: boolean = false;
  quiz_title: string;
  action_done: string = null;
  action_in_progress: string = null;
  error_in_action: string = null;
  available_attributes: string[] = ['{{first_name}}', '{{last_name}}', '{{email}}', '{{password}}'];

  search_param_control: FormControl;

  fetching_assigned_students: boolean;
  fetch_error: string = null;

  editor = ClassicEditor;

  editor_instance: any;

  recepients: AssignedStudent[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private quizService: QuizService) {}


  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.quiz_title = params['t'];
    });


    this.notisGroup = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });

    this.notify_all_users_control = this.fb.control(true);

    this.notify_all_users_control.valueChanges.subscribe(value => {
      if (value == false && !this.assigned_students_fetched ) this.fetchAssignedStudents();
      if (value == true) {
        this.recepients = [];
        this.assigned_students.forEach(student => student.selected = false)
      }
    })
  }

  fetchAssignedStudents() {
    this.fetching_assigned_students = true;  
    this.quizService.getAssignments(this.quiz_title).subscribe({
      next: (response) => {
        this.fetching_assigned_students = false;
        if (response.status == 'failed') {
          this.fetch_error = response.message;
          return null;
        }
        this.assigned_students = response.assignments;
        this.assigned_students_fetched = true;

        this.search_param_control = this.fb.control('');

        console.log(this.assigned_students)
      }
    })
  }


  get location() {
    return `/quiz/admin/quiz/${this.quiz_title}`;
  }

  get body() {
    return this.notisGroup.get('body');
  }

  get can_submit() {
    return this.notisGroup.valid;
  }

  get search_param() {
    return this.search_param_control.value;
  }

  onSubmit(form: HTMLFormElement) {
    this.submitted = true;

    this.action_in_progress = 'Sending notification to students...';
    this.action_done = null;
    this.error_in_action = null;

    let form_data = new FormData(form);

    form_data.append('body', this.body.value)

    if (this.notify_all_users_control.value == true) {
      form_data.append('notify_all', JSON.stringify(true));
    } else {
      form_data.append('notify_all', JSON.stringify(false));
      form_data.append('recepient_ids', JSON.stringify(this.recepients.map(r => r.id)));
    }

    this.quizService.notify(form_data, this.quiz_title).subscribe({
      next: response => {
        this.submitted = false;
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.error_in_action = null;
          this.action_done = response.message;
          this.sent = true;
        }
      }
    });

  }

  checkMatch(student: AssignedStudent) {
    if (((String(student.first_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.last_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.email).toLowerCase().search(this.search_param.toLowerCase()) >= 0))) return true;
    else return false;
  }

  addToRecepients(student: AssignedStudent) {
    this.recepients.push(student);
    student.selected = true;
    this.search_param_control.setValue('');
  }

  removeFromRecepients(student: AssignedStudent) {
    this.recepients.splice(this.recepients.findIndex((r => r.id == student.id)), 1);
    student.selected = false;
  }

  editorReady(event: any) {
    this.editor_instance = event;
  }

  insert(string: string) {
    this.editor_instance.focus();
    this.editor_instance.model.change(writer => {
      const insertPosition = this.editor_instance.model.document.selection.getFirstPosition();
      this.editor_instance.model.insertContent(writer.createText(string), insertPosition)
    })
  }
}

