import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromEvent, debounceTime } from 'rxjs';
import { OffshoreCourseService } from 'src/app/services/offshore-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CoursesService } from 'src/app/services/courses.service';
import { CohortService } from 'src/app/services/cohort.service';
import { ActivatedRoute } from '@angular/router';
import { EditableCohort } from 'src/app/interfaces/cohort';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import PostResponse from 'src/app/interfaces/base-response';

@Component({
    selector: 'app-add-offshore-course',
    standalone: true,
    templateUrl: './edit-cohort.component.html',
    styleUrls: ['./edit-cohort.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, EmptyContentComponent, ReportBarComponent, TooltipComponent]
})
export class EditCohortComponent implements OnInit {


  cohort: EditableCohort;

  cohortGroup!: FormGroup;
  unit_folded: boolean = true;
  type_folded: boolean = true;

  editable: boolean = false;

  fetching: boolean = false;

  cohort_name: string;

  error: string = null;


  // scheduleSelected: boolean = false;
  // imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  
  formError: string;
  courses_fetched: boolean = false;
  course_names: string[];
  fetching_courses: boolean = false;
  certificate_courses: {code?: string, title: string}[] = null;
  certification_courses: {code?: string, title: string}[] = null;
  offshore_courses: {title: string}[] = null;
  matched_courses: { title: string; code?: string }[] = [];
  errors: object = {
    name: null,
    course_type: null,
    course_name: null,
    start_date: null,
    end_date: null,
    duration: null,
  }
  errrorsRectified: number;
  errorneousFields: string[] = [];
  backWithErrors: boolean;
  tried_to_submit: boolean;

  constructor(private formBuilder: FormBuilder, private courses: CoursesService, private cohortService: CohortService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.cohort_name = params['n'];
      
    });

    this.fetch_cohort();

  }

  fetch_cohort() {
    this.fetching = true;
    this.cohortService.fetch_cohort_for_edit(this.cohort_name).subscribe({
      next: (response) => {
          // console.log(response)
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.handleFetchCohortResponse(response);
      }
    });
  }

  handleFetchCohortResponse(response: {
    status: string;
    message?: string;
    cohort?: EditableCohort;
  }) {
    this.cohort = response.cohort;
    this.error = null;

    let course_type;
    let course_identity;
    let course_name;
    let duration = JSON.parse(this.cohort.duration);

    if (this.cohort.course_type == "App\\Models\\CertificateCourse") {
      course_type = 'Certificate Course'
      course_identity = this.course.code;
      course_name = `${this.course.title} - ${this.course.code}`
    } else if (this.cohort.course_type == "App\\Models\\CertificationCourse") {
      course_type = 'Certification Course'
      course_identity = this.course.code;
      course_name = `${this.course.title} - ${this.course.code}`
    } else if (this.cohort.course_type == "App\\Models\\OffshoreCourse") {
      course_type = 'Offshore Course'
      course_identity = this.course.title;
      course_name = `${this.course.title}`
    }

    this.fetch_courses(course_type);

    // console.log(duration.unit);

    this.cohortGroup = this.formBuilder.group({
      name: [this.cohort.name, Validators.required],
      course_type: [course_type, Validators.required],
      course_identity: [course_identity],
      course_name: [course_name, Validators.required],
      start_date: [String(this.cohort.start_date).split(' ')[0]],
      duration: this.formBuilder.group({
        duration: [duration.duration],
        unit: [duration.unit],
      }),
      end_date: [String(this.cohort.start_date).split(' ')[0]],
      // schedule: [null],
    });
  }

  get course() {
    return this.cohort.course;
  }
 
  
  get students() {
    return <FormArray>this.cohortGroup.get('students');
  }

  get unit() {
    return <FormControl>this.cohortGroup.get('duration').get('unit');
  }

  get name() {
    return <FormControl>this.cohortGroup.get('name');
  }

  get course_type() {
    return <FormControl>this.cohortGroup.get('course_type');
  }

  get course_name() {
    return <FormControl>this.cohortGroup.get('course_name');
  }

  get course_identity() {
    return <FormControl>this.cohortGroup.get('course_identity');
  }

  get form_invalid() {
    
    return this.cohortGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  setDurationUnit(unit: string) {
    // this.currency.setValue(unit);
    let input = <HTMLInputElement> document.querySelector('[name="duration[unit]"]');
    input.value = unit;
    // console.log(this.unit, this.unit.value)
    this.unit.setValue(unit);
    input.dispatchEvent(new Event('change', {bubbles: true}));
    this.unit_folded = !this.unit_folded;
  }

  setCourseType(type: string) {
    this.course_type.setValue(type);
    this.course_name.setValue('');
    this.course_identity.setValue('');
    this.matched_courses = [];
    this.type_folded = !this.type_folded;
    if (type == 'Certificate Course' && this.certificate_courses) return;
    if (type == 'Certification Course' && this.certification_courses) return;
    if (type == 'Offshore Course' && this.offshore_courses) return;
    this.courses_fetched = null;
    
    this.fetch_courses(type);
  }


  setCourseName(course: {code?: string, title: string}) {
    this.course_identity.setValue(course.code ? course.code : course.title);
    this.course_name.setValue(`${course.title}${course.code ? ' - '+course.code : ''}`);
    this.matched_courses = [];
  }
  
  fetch_courses(type: string) {
    this.fetching_courses = true;
    // setTimeout(() => {
      
      this.courses.get_course_names(type).subscribe({
        next: (response) => {
          if (type == 'Certificate Course') this.certificate_courses = response;
          else if (type == 'Certification Course') this.certification_courses = response;
          else if (type == 'Offshore Course') this.offshore_courses = response;
          this.fetching_courses = false;
          this.courses_fetched = true;
  
          setTimeout(() => {
            let searchInputObservable = fromEvent(document.querySelector('#course_name'), 'input');
            searchInputObservable.pipe(debounceTime(100)).subscribe((e)=>{
              this.match_courses();
            });
            
          }, 0);
        }
      });
    // }, 6000);

  }

  match_courses() {
    let source: {code?: string, title: string}[];
    if (this.course_type.value == 'Certificate Course') source = this.certificate_courses;
    else if (this.course_type.value == 'Certification Course') source = this.certification_courses;
    else if (this.course_type.value == 'Offshore Course') source = this.offshore_courses;

    if (this.course_name.value == '') {
      this.matched_courses = []; return;
    }
    
  
    this.matched_courses = source.filter((course) => {
      if ((String(course.title).toLowerCase().search(this.course_name.value.toLowerCase()) >= 0) || (course.code && String(course.code).toLowerCase().search(this.course_name.value.toLowerCase()) >= 0)) return true;
      return false;
    });
  }



  

  // handleScheduleSelect(event: Event, embed: HTMLEmbedElement) {
  //   console.log('in handle schedule select');
  //   let file = (<HTMLInputElement>event.target).files[0];
  //   let reader = new FileReader();
  //   reader.onloadend = () => {
  //     embed.src = URL.createObjectURL(file);
  //     this.scheduleSelected = true;
  //   };
  //   if (file) reader.readAsDataURL(file);
  // }


  onSubmit(form: HTMLFormElement) {

    this.tried_to_submit = true;
    
    if (this.cohortGroup.invalid) return;
    
    this.submitted = true;
    
    let formData = new FormData(form);
    this.cohortService.edit(formData, this.cohort.name).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.handleResponse(response)
      },
    });
    
  }

  handleResponse(response: PostResponse) {
    this.formError = null;
    this.edited = true;
  }

}
