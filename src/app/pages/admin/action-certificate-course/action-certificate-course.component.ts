import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// import { CourseService } from 'src/app/course.service';
import { CertificateCourseService } from 'src/app/services/certificate-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CertificateCourse, Date, Module, Price } from 'src/app/interfaces/certificate-course';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import PostResponse from 'src/app/interfaces/post-response';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-action-certificate-course',
    standalone: true,
    templateUrl: './action-certificate-course.component.html',
    styleUrls: ['./action-certificate-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent, TooltipComponent, ReportBarComponent, EmptyContentComponent]
})
export class ActionCertificateCourseComponent implements OnInit {
  course!: CertificateCourse;
  // course_code!: string;
  courseGroup!: FormGroup;
  folded: boolean = true;
  fetching_course: boolean = false;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  tried_to_submit: boolean = false;
  formError: string = null;
  deleting: boolean = false;
  // deleted: boolean = false;
  error_in_deleting: string = null;
  no_course: string = null;

  constructor(private formBuilder: FormBuilder, private certificateCourseService: CertificateCourseService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let course_code;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_code = param.get('course_code')});
    
    this.fetch_course(course_code);
  }

  fetch_course(course_code: string) {
    this.fetching_course = true;
    this.certificateCourseService.get(course_code).subscribe({
      next: (response) => {
        this.fetching_course = false;
        if (response.status == 'failed') {
          this.no_course = response.message;
          return;
        }
        this.course = response.course;
        this.courseGroup = this.formBuilder.group({
          code: [this.course.code, Validators.required],
          title: [this.course.title, Validators.required],
          overview: [this.course.overview, Validators.required],
          objectives: this.formBuilder.array(
            (<string[]>JSON.parse(this.course.objectives)).map(objective => this.formBuilder.control(objective))
          ),
          attendees: this.formBuilder.array(
            (<string[]>JSON.parse(this.course.attendees)).map(attendee => this.formBuilder.control(attendee))
          ),
          prerequisites: this.formBuilder.array(
            (<string[]>JSON.parse(this.course.prerequisites)).map(prerequisite => this.formBuilder.control(prerequisite))
          ),
          modules: this.formBuilder.array(
            (<Module[]>JSON.parse(this.course.modules)).map(module => this.formBuilder.group({
              objective: [module.objective],
              overview: [module.overview]
          }))),
          price: this.formBuilder.group({
            amount: [(<Price>JSON.parse(this.course.price)).amount, [Validators.required, Validators.pattern(/^\d+$/)]],
            currency: [(<Price>JSON.parse(this.course.price)).currency, Validators.required]
          }),
          discount: [this.course.discount, Validators.pattern(/^\d+$/)],
          image: [null],
          // schedule: [null],
        });
        if (this.course.image_url) {
          this.pictureSelected = true;
          setTimeout(()=>{
            (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.course.image_url;
          }, 0);
        }
      },
    });
  }


  get objectives() {
    return <FormArray>this.courseGroup.get('objectives');
  }

  get attendees() {
    return <FormArray>this.courseGroup.get('attendees');
  }

  get prerequisites() {
    return <FormArray>this.courseGroup.get('prerequisites');
  }

  get modules() {
    return <FormArray>this.courseGroup.get('modules');
  }

  get image() {
    return <FormControl>this.courseGroup.get('image');
  }

  get endDate() {
    return <FormControl>this.courseGroup.get('date').get('end');
  }

  get unit() {
    return <FormControl>this.courseGroup.get('date').get('durationUnit');
  }

  get currency() {
    return <FormControl>this.courseGroup.get('price').get('currency');
  }

  get code() {
    return <FormControl>this.courseGroup.get('code');
  }

  get title() {
    return <FormControl>this.courseGroup.get('title');
  }
  
  get overview() {
    return <FormControl>this.courseGroup.get('overview');
  }

  get amount() {
    return <FormControl>this.courseGroup.get('price').get('amount');
  }

  get discount() {
    return <FormControl>this.courseGroup.get('discount');
  }

  get form_invalid() {
    
    return this.courseGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  addObjective() {
    if (this.editable) this.objectives.push(this.formBuilder.control(''));
  }
  addAttendee() {
    if (this.editable) this.attendees.push(this.formBuilder.control(''));
  }
  addPrerequisite() {
    if (this.editable) this.prerequisites.push(this.formBuilder.control(''));
  }
  addModule() {
    if (this.editable) {
      this.modules.push(this.formBuilder.group({
        objective: [''],
        overview: ['']
      }));
    }
  }

  setDurationUnit(unit: string) {
    // this.currency.setValue(unit);
    if (this.editable) {
      let input = <HTMLInputElement> document.querySelector('[name="date[duration-unit]"]');
      input.value = unit;
      // console.log(this.unit, this.unit.value)
      this.unit.setValue(unit);
      input.dispatchEvent(new Event('change', {bubbles: true}));
      this.folded = !this.folded;
    }
  }

  setCurrency(currency: string) {
    if (this.editable) {
      let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
      
      this.currency.setValue(currency);
      this.curFolded = !this.curFolded;
    }
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    if (this.editable) {
      let file = (<HTMLInputElement>event.target).files[0];
      let reader = new FileReader();
      
      reader.onloadend = () => {
        img.src = <string>reader.result;
        this.pictureSelected = true;
      };
      if (file) reader.readAsDataURL(file);
    }
  }

  

  deleteCourse(course_code: string) {
    this.deleting = true;
    this.certificateCourseService.delete(course_code).subscribe({
      next: (response) => {
        this.deleting = false;
        if (response.status == 'success') {
          this.error_in_deleting = null;
          this.navigator.navigate(['/admin/courses']);
        } else this.error_in_deleting = response.message;
      },
    });
  }

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.courseGroup.invalid) return;

      this.submitted = true;
      let formData = new FormData(form);
      this.certificateCourseService.edit(formData, this.course.code).subscribe({
        next: (response) => {
          this.submitted = false;
          if (response.status == 'failed') {
            this.formError = response.message;
            return;
          }
          this.handleResponse(response);
        },
      });
  }

  handleResponse(response: PostResponse) {
    this.formError = null;
    this.edited = true;
  }
}
