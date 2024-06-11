import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, fromEvent } from 'rxjs';
import { AssignedStudent } from 'src/app/interfaces/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-populate-assignment',
    standalone: true,
    templateUrl: './populate-assignment.component.html',
    styleUrl: './populate-assignment.component.css',
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, EmptyContentComponent]
})
export class PopulateAssignmentComponent {
  assignment_name: string;
  fetching: boolean;


  all_students: AssignedStudent[];

  ids_of_visible_students: number[] = [];

  select_all_control: FormControl;


  error: string = null;
  studentsGroup: FormGroup;
  submitted: boolean;
  search_input_stream: Observable<Event>;
  search_param: string;
  created: boolean;
  formError: string = null;
  @ViewChild('search_field', {static: false}) search_field: ElementRef;


  constructor (private route: ActivatedRoute, private assignmentService: AssignmentService, private fb: FormBuilder, private change_detector: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.assignment_name = params['n'];
      // console.log(this.quiz_title)
    });


    this.fetchAllStudents(); // gets all students indicating those who are already assigned to assignment
  }

  fetchAllStudents() {
    this.fetching = true;
    this.assignmentService.getAllStudents(this.assignment_name).subscribe({
      next: (response) => {
        console.log(response)
        this.fetching = false;
        if (response.status == 'failed') {
          this.error = response.message;
          return;
        }
        this.handleResponse(response);
    }
  });
}

handleResponse(response: {
  status: string;
  message?: string;
  students?: AssignedStudent[];
}) {
  this.all_students = response.students;
  this.error = null;

  this.studentsGroup = this.fb.group({
    students: this.fb.array([]),
  });

  this.select_all_control = this.fb.control(false);

  for (let student of this.all_students) {
  if (student.is_assigned) this.students.push(this.fb.control(true));
  else this.students.push(this.fb.control(false));
  }

  this.change_detector.detectChanges();


  this.search_input_stream  = fromEvent(this.search_field.nativeElement, 'input');

  this.search_input_stream.pipe(debounceTime(100)).subscribe((e)=>{
    this.search_param = (<HTMLInputElement>e.target).value;
  });


  }

  get students() {
    return <FormArray>this.studentsGroup.get('students');
  }

  get location() {
    return '';
  }
  
  get selectAll() {
    return <FormControl>this.select_all_control;
  }

  sel () {console.log('selecion changed')}


  check_match(student: AssignedStudent, index: number) {
    if ((String(student.first_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.last_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.email).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.company.name).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
    else return false;
  }


  onSubmit(form: HTMLFormElement) {
    
    this.submitted = true;
    
    let formData = new FormData(form);
    this.assignmentService.updateStudents(formData, this.assignment_name).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.created = true;
      },
    });
    
  }
}
