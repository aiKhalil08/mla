import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CoursesService } from 'src/app/services/courses.service';
import { Observable, debounceTime, fromEvent, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import PostResponse from 'src/app/interfaces/post-response';
import { StudentService } from 'src/app/services/student.service';
import { CohortService } from 'src/app/services/cohort.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { CertificateService } from 'src/app/services/certificate.service';
import { ViewCertificateComponent } from 'src/app/partials/view-certificate/view-certificate.component';

@Component({
    selector: 'app-certificates',
    standalone: true,
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RedirectButtonComponent, ReportBarComponent, TooltipComponent, ViewCertificateComponent]
})
export class CertificatesComponent implements OnInit {
  certificatesGroup: FormGroup;
  uploaded: boolean = false;
  submitted: boolean = false;
  formError: string;
  fetch_affiliate_error: string;
  type_folded: boolean = true;

  courses_fetched: boolean = false;
  fetching_courses: boolean = false;

  fetching_cohorts: boolean = false;
  cohorts_fetched: boolean = false;
  cohorts: {name: string, status_id: 0 | 1}[] = null;
  matched_cohorts: { name: string; status_id: 0|1}[] = [];

  fetching_affiliate: boolean = false;
  certificate_courses: {code?: string, title: string}[] = null;
  certification_courses: {code?: string, title: string}[] = null;
  offshore_courses: {title: string}[] = null;
  matched_courses: { title: string; code?: string }[] = [];
  filtered_length: number = 0;
  match_found: boolean = false;
  // errors: object = {
  //   student_email: null,
  //   course_type: null,
  //   course_name: null,
  //   price: null,
  // }
  // errrorsRectified: number;
  // errorneousFields: string[] = [];
  // backWithErrors: boolean;
  // student_name: string;
  // affiliate_expanded: boolean = false;
  // affiliate: {name: string, percentage: string, email: string};
  tried_to_submit: boolean = false;
  cohort_name_set: boolean = false;
  course_name_set: boolean = false;

  files_selected: boolean = false;

  fetching_students: boolean = false;
  students: {
    first_name: string;
    last_name: string;
    email: string;
    certificate?: string;
  }[] = null;

  editArray: string[] = [];

  PER_PAGE = 10;
  pages_count: number;
  present_page: number = 0;
  pages: {
    first_name: string;
    last_name: string;
    email: string;
    certificate?: string;
  }[][] = [];
  certificate?: string;
  // show_certificate: boolean;
  modalClosed: boolean;


  
  constructor(private certificateService: CertificateService, private formBuilder: FormBuilder, private courseService: CoursesService, private cohortService: CohortService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {

    // setInterval(()=> console.log(this.matched_courses), 2000)
    
      this.certificatesGroup = this.formBuilder.group({
        certificate_type: ['', Validators.required],
        cohort_name: ['',],
        course_type: ['',],
        course_name: ['',],
        course_identity: [''],
      });
    
    this.certificate_type.valueChanges.subscribe((value: string) => {
      this.students = null;
      if (value == 'cohort_certificates') {

        this.course_type.clearValidators();
        this.course_name.clearValidators();
        this.course_type.updateValueAndValidity();
        this.course_name.updateValueAndValidity();
        // this.course_type.setValue(null);
        this.course_name.setValue(null);
        this.course_name_set = false;

        this.cohort_name.setValidators(Validators.required);
        this.cohort_name.updateValueAndValidity();

        if (this.cohorts_fetched) {
          setTimeout(() => {
            
            let searchInputObservable = fromEvent(document.querySelector('#cohort_name'), 'input');
            searchInputObservable.pipe(debounceTime(100)).subscribe((e)=>{
              this.match_cohorts();
            });
          }, 0);
        }
      } else {
        this.cohort_name.clearValidators();
        this.cohort_name.updateValueAndValidity();
        this.cohort_name.setValue(null);
        this.cohort_name_set = false;
        this.matched_cohorts = [];


        this.course_type.setValidators(Validators.required);
        this.course_name.setValidators(Validators.required);
        this.course_type.updateValueAndValidity();
        this.course_name.updateValueAndValidity();

        if (this.courses_fetched) {
          setTimeout(() => {
            let searchInputObservable = fromEvent(document.querySelector('#course_name'), 'input');
            searchInputObservable.pipe(debounceTime(100)).subscribe((e)=>{
              this.match_courses();
            });
            
          }, 0);
        }
      }
    });
  }


  get certificate_type() {
    return <FormControl>this.certificatesGroup.get('certificate_type');
  }

  get course_type() {
    return <FormControl>this.certificatesGroup.get('course_type');
  }

  get course_name() {
    return <FormControl>this.certificatesGroup.get('course_name');
  }

  get course_identity() {
    return <FormControl>this.certificatesGroup.get('course_identity');
  }

  get cohort_name() {
    return <FormControl>this.certificatesGroup.get('cohort_name');
  }

  
  get form_invalid() {
    
    return this.certificatesGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }


  editable(email: string): boolean {
    if (this.editArray.includes(email)) return true;
    else return false;
  }

  edit(email: string) {
    this.editArray.push(email);
  }

  check_if_file_selected() {
    this.changeDetector.detectChanges();
  }

  file_selected(file_input: HTMLInputElement) {
    if (file_input.files[0]) return true;
    else return false;
  }



  fetch_cohorts(event: Event) {
    if (this.certificate_type.value != 'cohort_certificates') return;

    if (this.cohorts) return;

    this.fetching_cohorts = true;

    this.cohortService.get_cohort_names().subscribe({
      next: (response) => {
        
        this.fetching_cohorts = false;
        this.cohorts_fetched = true;

        this.cohorts = response;

        setTimeout(() => {
          let searchInputObservable = fromEvent(document.querySelector('#cohort_name'), 'input');
          searchInputObservable.pipe(debounceTime(100)).subscribe((e)=>{
            this.match_cohorts();
          });
          
        }, 0);
      }
    });

  }


  match_cohorts() {
    // console.log('in match cohorts')

    let source: {name: string, status_id: 0|1}[] = this.cohorts;

    if (this.cohort_name.value == '') {
      this.matched_cohorts = []; return;
    }
    
  
    this.matched_cohorts = source.filter(({name: cohort_name}) => cohort_name.toLowerCase().search(this.cohort_name.value.toLowerCase()) >= 0)
  }

  setCohortName(name: string) {
    this.cohort_name_set = true;
    this.course_name_set = false;
    this.cohort_name.setValue(name);
    this.matched_cohorts = [];
  }


  setCourseType(type: string) {
    this.course_type.setValue(type);
    this.course_name.setValue(null);
    this.course_identity.setValue(null);
    this.matched_courses = [];
    this.type_folded = !this.type_folded;
    if (type == 'Certificate Course' && this.certificate_courses) return;
    if (type == 'Certification Course' && this.certification_courses) return;
    if (type == 'Offshore Course' && this.offshore_courses) return;
    this.courses_fetched = null;
    this.fetching_courses = true;
    // setTimeout(() => {
      
      this.courseService.get_course_names(type).subscribe({
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
    console.log('in match courses');
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


  setCourseName(course: {code?: string, title: string}) {
    this.course_name_set = true;
    this.cohort_name_set = false;
    this.course_identity.setValue(course.code ? course.code : course.title);
    this.course_name.setValue(`${course.title}${course.code ? ' - '+course.code : ''}`);
    this.matched_courses = [];
  }

  fetch_students() {
    this.students = null;
    this.pages = [];
    if ((this.certificate_type.value == 'cohort_certificates' && !this.cohort_name.value) || (this.certificate_type.value == 'individual_course_certificates' && !this.course_identity.value)) return false;
    this.fetching_students = true;
    if (this.certificate_type.value == 'cohort_certificates') {
        
        this.cohortService.get_students_certificates(this.cohort_name.value).subscribe({
          next: response => {
            // console.log(response);
            this.editArray = [];
            this.fetching_students = false;
            this.students = response.students;
            this.pages_count = Math.ceil(this.students.length / this.PER_PAGE);
            for (let i = 0; i < this.pages_count; i++) {
              let start = i*this.PER_PAGE;
              let end = this.students.length - start >= this.PER_PAGE ? start + this.PER_PAGE : undefined;
              this.pages.push(this.students.slice(start, end));
            }
          }
        });
    } else if (this.certificate_type.value == 'individual_course_certificates') {
      this.courseService.get_enrolled_students(this.course_type.value, this.course_identity.value).subscribe({
        next: response => {
          console.log(response);
          this.editArray = [];
          this.fetching_students = false;
          this.students = response.students;
          this.pages_count = Math.ceil(this.students.length / this.PER_PAGE);
          for (let i = 0; i < this.pages_count; i++) {
            let start = i*this.PER_PAGE;
            let end = this.students.length - start >= this.PER_PAGE ? start + this.PER_PAGE : undefined;
            this.pages.push(this.students.slice(start, end));
          }
        }
      });
    }

    return false;
    // this.student.fetch_student_name((<HTMLInputElement>event.target).value).subscribe({
    //   next: (response) => {
    //     if (response.status == 'failed') {
    //       this.handleError({student_email: ['Student with provided email not found']});
    //       this.student_name = null;
    //     }
    //     else {
    //       this.student_name = response.name;
    //       this.errors['student_email'] = null;
    //     }

    //     // console.log(this.errors)
    //   }
    // });
  }

  set_present_page(page: number) {
    if (page < 0) this.present_page = 0;
    else if (page > this.pages_count - 1) this.present_page = this.pages_count - 1;
    else this.present_page = page;
  }


  onSubmit(form: HTMLFormElement) {

    if (!this.files_selected) return;

    
    this.tried_to_submit = true;
    
    if (this.certificatesGroup.invalid) return;
    
    this.submitted = true;

    let formData = new FormData(form);

    if (this.editArray.length > 0) formData.append('edits', JSON.stringify(this.editArray));

    let name, type;

    if (this.certificate_type.value == 'cohort_certificates') {
      name = this.cohort_name.value;
      type = 'cohort'; 
    } else if (this.certificate_type.value == 'individual_course_certificates') {
      name = this.course_identity.value;
      type = 'individual-course'; 
    }

    this.certificateService.upload(formData, name, type).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.handleResponse(response);
      },
      error: (error) => {
        this.submitted = false;
        // this.handleError(error);
      }
    });
  }

  handleResponse(response: PostResponse) {
      this.uploaded = true;
      this.submitted = false;
      this.formError = null;
  }

  show_certificate(certificate: string) {
    this.modalClosed = false;
    this.certificate = certificate;
  }

  close_modal() {
    this.modalClosed = true;
    this.certificate = null;
  }

  // get no_errors() {
  //   if (this.errorneousFields.length == 0) return true;
    
  //   if (this.errorneousFields.length == this.errrorsRectified) return true;
  //   return false;
  // }

  // handleError(error: HttpErrorResponse | object) {
  //   // console.log(error)
  //   this.errrorsRectified = 0;
  //   if (error instanceof HttpErrorResponse) this.errors = error.error.errors;
  //   else this.errors = error
  //   this.errorneousFields = Object.keys(this.errors).filter((key)=> this.errors[key] != null);
  //   let rectifyField = (event: Event) => {
  //     if (this.errors[(<HTMLInputElement>event.target).name] == null) return;
  //     console.log('in rectify field and beyong null check')
  //     event.target.removeEventListener('input', rectifyField);
  //     this.errrorsRectified++;
  //     this.errors[(<HTMLInputElement>event.target).getAttribute('name')] = null;
  //   }
  //   this.submitted = false;
  //   this.backWithErrors = true;
  //   if (this.errorneousFields.length > 0) {
  //     for (let key of this.errorneousFields) {
  //       // console.log(key)
  //       document.querySelector(`input[name=${key}]`)?.addEventListener('input', rectifyField);
  //     }
  //   }
  // }

  

}
