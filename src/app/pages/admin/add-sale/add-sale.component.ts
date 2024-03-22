import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CoursesService } from 'src/app/services/courses.service';
import { debounceTime, fromEvent } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import PostResponse from 'src/app/interfaces/post-response';
import { StudentService } from 'src/app/services/student.service';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { requiredIfChecked } from 'src/app/custom-validators/requiredIfChecked';

@Component({
    selector: 'app-add-sale',
    standalone: true,
    templateUrl: './add-sale.component.html',
    styleUrls: ['./add-sale.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RedirectButtonComponent]
})
export class AddSaleComponent {
  saleGroup: FormGroup;
  created: boolean = false;
  submitted: boolean = false;
  formError: string;
  fetch_affiliate_error: string;
  type_folded: boolean = true;
  course_id_folded: boolean = true;
  courses_fetched: boolean = false;
  course_names: string[];
  fetching_courses: boolean = false;
  fetching_affiliate: boolean = false;
  certificate_courses: {name: string}[] = null;
  certification_courses: {name: string}[] = null;
  offshore_courses: {name: string}[] = null;
  course_name_is_focused: boolean = false;
  filtered_length: number = 0;
  match_found: boolean = false;
  matched_courses: { name: string; }[] = [];
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
  
  constructor(private saleService: SaleService, private formBuilder: FormBuilder, private courses: CoursesService, private student: StudentService, private affiliateService: AffiliateService) {}

  ngOnInit(): void {
    // console.log('initialized')
    this.saleGroup = this.formBuilder.group({
      student_email: ['', Validators.required],
      course_type: ['', Validators.required],
      course_name: ['', Validators.required],
      price: ['', Validators.required],
      has_referral: [false],
      referral_code: ['',],
      referrer_email: [''],
      commission: [''],
    });

    // setInterval(() => console.log(this.errorneousFields), 2000)
  }

  get form_is_valid() {
    if (this.saleGroup.invalid) return false;
    if (this.saleGroup.get('has_referral').value == true && !this.saleGroup.get('referral_code').value) return false;
    if (this.saleGroup.get('has_referral').value == true && !this.affiliate) return false;
    return true;
  }

  get course_type() {
    return <FormControl>this.saleGroup.get('course_type');
  }

  get course_name() {
    return <FormControl>this.saleGroup.get('course_name');
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

  formatCurrency(number: string) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }

  get commission() {
    return String(Number(this.sale_price.value) * Number(this.affiliate.percentage) / 100);
  }



  setCourseType(type: string) {
    this.course_type.setValue(type);
    this.course_name.setValue('');
    this.matched_courses = [];
    this.type_folded = !this.type_folded;
    this.course_id_folded = true;
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
    let source: {name: string}[];
    if (this.course_type.value == 'Certificate Course') source = this.certificate_courses;
    else if (this.course_type.value == 'Certification Course') source = this.certification_courses;
    else if (this.course_type.value == 'Offshore Course') source = this.offshore_courses;

    if (this.course_name.value == '') {
      this.matched_courses = []; return;
    }
    
  
    this.matched_courses = source.filter(({name: course_name}) => course_name.toLowerCase().search(this.course_name.value.toLowerCase()) >= 0)
  }


  setCourseName(name: string) {
    this.course_name.setValue(name);
    this.matched_courses = [];
  }


  onSubmit(form) {
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
    this.affiliateService.fetch_affiliate(code).subscribe({
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
