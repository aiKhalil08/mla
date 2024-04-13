import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CohortService } from 'src/app/services/cohort.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, fromEvent } from 'rxjs';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-populate-cohort',
    standalone: true,
    templateUrl: './populate-cohort.component.html',
    styleUrls: ['./populate-cohort.component.css'],
    imports: [CommonModule, EmptyContentComponent, ReactiveFormsModule, RedirectButtonComponent]
})
export class PopulateCohortComponent implements OnInit {

  all_students!: {first_name: string, last_name: string; email: string; registration_status: '0'|'1'; id: number}[];
  fetching: boolean = false;
  error: string = null;
  cohort_name: string = null;
  studentsGroup: FormGroup;
  submitted: boolean;
  search_input_stream: Observable<Event>;
  search_param: string;
  created: boolean;
  formError: string = null;
  @ViewChild('search_field', {static: false}) search_field: ElementRef;


  constructor(private cohortService: CohortService, private route: ActivatedRoute, private fb: FormBuilder, private el: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.cohort_name = params['n'];
      
    });

    this.studentsGroup = this.fb.group({
      students: this.fb.array([]),
    })
    this.get_students();
  }

  // ngAfterViewInit() {
  //   this.search_field = this.el.nativeElement.querySelector('input');
  //   console.log(this.search_field)
  //   this.get_students();
  // }

  get students() {
    return <FormArray>this.studentsGroup.get('students');
  }

  get location() {
    return `/admin/cohort/${this.cohort_name}`;
  }

  get_students() {
    this.fetching = true;
    this.cohortService.get_all_students(this.cohort_name).subscribe({
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
    students: {
        first_name: string;
        last_name: string;
        email: string;
        id: number;
        registration_status: '0' | '1';
    }[];
  }) {
    this.all_students = response.students;
    this.error = null;

    for (let student of this.all_students) {
    if (student.registration_status == '1') this.students.push(this.fb.control(true));
    else this.students.push(this.fb.control(false));
    }

    this.changeDetector.detectChanges();


    this.search_input_stream  = fromEvent(this.search_field.nativeElement, 'input');

    this.search_input_stream.pipe(debounceTime(100)).subscribe((e)=>{
      this.search_param = (<HTMLInputElement>e.target).value;
    });


  }


  check_match(student: {first_name: string, last_name: string; email: string}) {
    if ((String(student.first_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.last_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.email).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
      return false;
  }

  onSubmit(form: HTMLFormElement) {
    
    this.submitted = true;
    
    let formData = new FormData(form);
    this.cohortService.add_students(formData, this.cohort_name).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.created = true;
        // this.handleResponse(response)
      },
    });
    
  }
}
