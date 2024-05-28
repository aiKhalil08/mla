import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CertificationCourse} from 'src/app/interfaces/certification-course';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { CertificationCourseService } from 'src/app/services/certification-course.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import PostResponse from 'src/app/interfaces/base-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-action-certification-course',
    standalone: true,
    templateUrl: './action-certification-course.component.html',
    styleUrls: ['./action-certification-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent, ReportBarComponent, TooltipComponent, EmptyContentComponent]
})
export class ActionCertificationCourseComponent implements OnInit {
  course!: CertificationCourse;
  // course_code!: string;
  courseGroup!: FormGroup;
  fetching_course: boolean = false;
  folded: boolean = true;
  curFolded: boolean = true;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  tried_to_submit: boolean = false;
  formError: string = null;
  deleting: boolean = false;
  error_in_deleting: string = null;
  no_course: string = null;

  constructor(private formBuilder: FormBuilder, private certificationCourseService: CertificationCourseService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let course_code;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_code = param.get('course_code')});
    
    this.fetch_course(course_code);
  }

  fetch_course(course_code: string) {
    this.fetching_course = true;
    this.certificationCourseService.get(course_code).subscribe({
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
            this.course.objectives.map(objective => this.formBuilder.control(objective))
          ),
          attendees: this.formBuilder.array(
            this.course.attendees.map(attendee => this.formBuilder.control(attendee))
          ),
          prerequisites: this.formBuilder.array(
            this.course.prerequisites.map(prerequisite => this.formBuilder.control(prerequisite))
          ),
          modules: this.formBuilder.array(
            this.course.modules.map(module => this.formBuilder.group({
              objective: [module.objective],
              overview: [module.overview]
          }))),
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

  add(control: string) {
    let form_array = <FormArray>this.courseGroup.get(control+'s');
    if (control == 'module') {
      form_array.push(this.formBuilder.group({
        objective: [''],
        overview: ['']
      }));
    } else form_array.push(this.formBuilder.control(''));
  }
  remove(control: string) {
    let form_array = <FormArray>this.courseGroup.get(control+'s');
    form_array.removeAt(form_array.length - 1);
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

  handleScheduleSelect(event: Event, embed: HTMLEmbedElement) {
    if (this.editable) {
      let file = (<HTMLInputElement>event.target).files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        embed.src = URL.createObjectURL(file);
        this.scheduleSelected = true;
      };
      if (file) reader.readAsDataURL(file);
    }
  }


  deleteCourse(course_code: string) {
    this.deleting = true;
    this.certificationCourseService.delete(course_code).subscribe({
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
      this.certificationCourseService.edit(formData, this.course.code).subscribe({
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
