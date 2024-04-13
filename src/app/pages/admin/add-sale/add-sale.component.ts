import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CoursesService } from 'src/app/services/courses.service';
import { Observable, debounceTime, fromEvent, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import PostResponse from 'src/app/interfaces/post-response';
import { StudentService } from 'src/app/services/student.service';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { CohortService } from 'src/app/services/cohort.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';

@Component({
    selector: 'app-add-sale',
    standalone: true,
    templateUrl: './add-sale.component.html',
    styleUrls: ['./add-sale.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RedirectButtonComponent, ReportBarComponent, TooltipComponent]
})
export class AddSaleComponent implements OnInit {
  saleGroup: FormGroup;
  created: boolean = false;
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
  errors: object = {
    student_email: null,
    course_type: null,
    course_name: null,
    price: null,
  }
  errrorsRectified: number;
  errorneousFields: string[] = [];
  backWithErrors: boolean;
  student_name: string;
  affiliate_expanded: boolean = false;
  affiliate: {name: string, percentage: string, email: string};
  tried_to_submit: boolean = false;

  referral_code_validator_added: boolean = false;

  cohortSearchInputObservable: Observable<Event>;
  
  constructor(private saleService: SaleService, private formBuilder: FormBuilder, private courses: CoursesService, private cohortService: CohortService, private student: StudentService, private affiliateService: AffiliateService) {}

  ngOnInit(): void {
    // console.log('initialized')
    // setTimeout(() => {
      
      this.saleGroup = this.formBuilder.group({
        student_email: ['', Validators.required],
        sale_type: ['', Validators.required],
        cohort_name: ['',],
        course_type: ['',],
        course_name: ['',],
        course_identity: [''],
        price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        has_referral: [false],
        referral_code: ['', ],
        referrer_email: [''],
        commission: [''],
      });
    // }, 5000);

    // setInterval(() => console.log(this.matched_cohorts), 2000)
    this.sale_type.valueChanges.subscribe((value: string) => {
      if (value == 'cohort_sale') {

        this.course_type.clearValidators();
        this.course_name.clearValidators();
        this.course_type.updateValueAndValidity();
        this.course_name.updateValueAndValidity();

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
        this.course_type.setValidators(Validators.required);
        this.course_name.setValidators(Validators.required);
        this.course_type.updateValueAndValidity();
        this.course_name.updateValueAndValidity();

        this.cohort_name.clearValidators();
        this.cohort_name.updateValueAndValidity();

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

  expand_affiliate() {
    this.affiliate_expanded = !this.affiliate_expanded;

    
    if (this.affiliate_expanded) {
      this.referral_code.setValidators(Validators.required);
      this.referral_code.updateValueAndValidity();
    } else {
      this.referral_code.clearValidators();
      this.referral_code.updateValueAndValidity();
    }
  }

  // get form_is_valid() {
  //   if (this.saleGroup.invalid) return false;
  //   if (this.saleGroup.get('has_referral').value == true && !this.saleGroup.get('referral_code').value) return false;
  //   if (this.saleGroup.get('has_referral').value == true && !this.affiliate) return false;
  //   return true;
  // }

  // get form_not_valid() {
  //   return of((this.tried_to_submit && this.form_invalid) || this.created || this.submitted);
  //   // return ;
  // }

  get sale_type() {
    return <FormControl>this.saleGroup.get('sale_type');
  }

  get course_type() {
    return <FormControl>this.saleGroup.get('course_type');
  }

  get course_name() {
    return <FormControl>this.saleGroup.get('course_name');
  }

  get course_identity() {
    return <FormControl>this.saleGroup.get('course_identity');
  }

  get cohort_name() {
    return <FormControl>this.saleGroup.get('cohort_name');
  }

  get has_referral() {
    return <FormControl>this.saleGroup.get('has_referral');
  }

  get referral_code() {
    return <FormControl>this.saleGroup.get('referral_code');
  }

  get sale_price() {
    return <FormControl>this.saleGroup.get('price');
  }

  get referrer_email () {
    return <FormControl>this.saleGroup.get('referrer_email');
  }

  get price () {
    return <FormControl>this.saleGroup.get('price');
  }

  get student_email () {
    return <FormControl>this.saleGroup.get('student_email');
  }

  get commission() {
    return String(Number(this.sale_price.value) * Number(this.affiliate.percentage) / 100);
  }

  get form_invalid() {
    
    return this.saleGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {
    // console.log(control, control.errors)

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  formatCurrency(number: string) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }



  fetch_cohorts(event: Event) {
    if (this.sale_type.value != 'cohort_sale') return;

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
    this.cohort_name.setValue(name);
    this.matched_cohorts = [];
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


  setCourseName(course: {code?: string, title: string}) {
    this.course_identity.setValue(course.code ? course.code : course.title);
    this.course_name.setValue(`${course.title}${course.code ? ' - '+course.code : ''}`);
    this.matched_courses = [];
  }


  onSubmit(form: HTMLFormElement) {

    this.tried_to_submit = true;
    
    if (this.saleGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    this.saleService.add(formData).subscribe({
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
        this.handleError(error);
      }
    });
  }

  handleResponse(response: PostResponse) {
      this.created = true;
      this.submitted = false;
  }

  get no_errors() {
    if (this.errorneousFields.length == 0) return true;
    
    if (this.errorneousFields.length == this.errrorsRectified) return true;
    return false;
  }

  handleError(error: HttpErrorResponse | object) {
    // console.log(error)
    this.errrorsRectified = 0;
    if (error instanceof HttpErrorResponse) this.errors = error.error.errors;
    else this.errors = error
    this.errorneousFields = Object.keys(this.errors).filter((key)=> this.errors[key] != null);
    let rectifyField = (event: Event) => {
      if (this.errors[(<HTMLInputElement>event.target).name] == null) return;
      console.log('in rectify field and beyong null check')
      event.target.removeEventListener('input', rectifyField);
      this.errrorsRectified++;
      this.errors[(<HTMLInputElement>event.target).getAttribute('name')] = null;
    }
    this.submitted = false;
    this.backWithErrors = true;
    if (this.errorneousFields.length > 0) {
      for (let key of this.errorneousFields) {
        // console.log(key)
        document.querySelector(`input[name=${key}]`)?.addEventListener('input', rectifyField);
      }
    }
  }

  fetch_student(event: Event) {
    this.student.fetch_student_name((<HTMLInputElement>event.target).value).subscribe({
      next: (response) => {
        if (response.status == 'failed') {
          this.handleError({student_email: ['Student with provided email not found']});
          this.student_name = null;
        }
        else {
          this.student_name = response.name;
          this.errors['student_email'] = null;
        }

        // console.log(this.errors)
      }
    });
  }


  fetch_affiliate() {
    this.fetching_affiliate = true;
    let code = this.referral_code.value;
    this.affiliateService.fetch_affiliate_details(code).subscribe({
      next: (response) => {
        this.fetching_affiliate = false;
        if (response.status == 'failed') {
          this.fetch_affiliate_error = response.message;
          this.affiliate = null;
        }
        else {
          this.handleFetchAffiliateResponse(response);
        }
      }
    });
  }

  handleFetchAffiliateResponse(response: { status: string; affiliate: {name: string; percentage: string, email: string} }) {
    this.fetch_affiliate_error = null;
    this.affiliate = response.affiliate;
    this.referrer_email.setValue(this.affiliate.email);
    this.saleGroup.get('commission').setValue(this.commission);
  }


  toggleDropdown() {
    this.affiliate_expanded = !this.affiliate_expanded;
  }
}
