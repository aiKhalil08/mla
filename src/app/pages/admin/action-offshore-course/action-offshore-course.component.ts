import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
// import { CourseService } from 'src/app/course.service';
import { OffshoreCourseService } from 'src/app/services/offshore-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { OffshoreCourse } from 'src/app/interfaces/offshore-course';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import PostResponse from 'src/app/interfaces/base-response';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { add, format } from 'date-fns';

@Component({
    selector: 'app-action-offshote-course',
    standalone: true,
    templateUrl: './action-offshore-course.component.html',
    styleUrls: ['./action-offshore-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent, ReportBarComponent, TooltipComponent, EmptyContentComponent]
})
export class ActionOffshoreCourseComponent implements OnInit {
  course!: OffshoreCourse;
  // course_title!: string;
  courseGroup!: FormGroup;
  fetching_course: boolean = false;
  folded: boolean = true;
  curFolded: boolean = true;
  locFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;
  error_in_deleting: string = null;
  deleting: boolean = false;
  no_course: string = null;

  constructor(private formBuilder: FormBuilder, private offshoreCourseService: OffshoreCourseService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let course_title;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_title = param.get('course_title')});
    // console.log(this.offshoreCourseService);return;
    
    this.fetch_course(course_title);
  }

  fetch_course(course_title: string) {
    this.fetching_course = true;
    this.offshoreCourseService.get(course_title).subscribe({
      next: (response) => {
        console.log(response)
        this.fetching_course = false;
        if (response.status == 'failed') {
          this.no_course = response.message;
          return;
        }
        this.course = response.course;
        this.courseGroup = this.formBuilder.group({
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
          date: this.formBuilder.group({
            start: [this.course.date.start],
            duration: [this.course.date.duration],
            durationUnit: [this.course.date['duration-unit']],
            end: [this.course.date.end]
          }),
          price: this.formBuilder.group({
            amount: [this.course.price.amount, [Validators.required, Validators.pattern(/^\d+$/)]],
            currency: [this.course.price.currency, Validators.required]
          }),
          discount: [this.course.discount, Validators.pattern(/^\d+$/)],
          location: [this.course.location, Validators.required],
          image: [null],
          // schedule: [null],
        });

        console.log(this.objectives)
        // console.log('start is: ', (<Date>JSON.parse(this.course.date)))
        setTimeout(()=>{
          if (this.course.image_url) {
            this.pictureSelected = true;
            (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.course.image_url;
          }
          // (<HTMLEmbedElement>document.querySelector('#schedulePreview')).src = this.course.schedule_url;
          let startDate = <HTMLInputElement> document.querySelector('[name="date[start]"]');
          let duration = <HTMLInputElement> document.querySelector('[name="date[duration]"]');
          let durationUnit = <HTMLInputElement> document.querySelector('[name="date[duration-unit]"]');
          let endDate = <HTMLInputElement> document.querySelector('[name="date[end]"]');
          let startChange$ = fromEvent(startDate, 'input');
          let durationChange$ = fromEvent(duration, 'input');
          let unitChange$ = fromEvent(durationUnit, 'change');
      
          let lake$ = merge(startChange$, durationChange$, unitChange$);
          this.dateStream$ = lake$.pipe(
            map(e => (<HTMLInputElement> e.target).value),
            filter(e => e.length > 0),
            debounceTime(100),
            distinctUntilChanged()
          );
      
          this.dateStream$.subscribe(e => {
            if ([startDate, duration, durationUnit].filter((element)=>element.value !== e).every((element) => element.value != '')) {
              let interval: object = {};
              interval[String(durationUnit.value).toLowerCase()] = Number(duration.value);

              this.endDate.setValue(format(add(startDate.value, interval), 'yyyy-MM-dd'));
            }
          });
        }, 0);
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

  get location() {
    return <FormControl>this.courseGroup.get('location');
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

  setCurrency(currency: string) {
    if (this.editable) {
      let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
      // input.value = unit;
      // this.unit.setValue(currency)
      this.currency.setValue(currency);
      // input.dispatchEvent(new Event('change', {bubbles: true}));
      this.curFolded = !this.curFolded;
    }
  }

  setLocation(location: string) {
    let input = <HTMLInputElement> document.querySelector('[name="location"]');
    this.location.setValue(location);
    this.locFolded = !this.locFolded;
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
      // URL.createObjectURL(file)
      if (file) reader.readAsDataURL(file);
    }
  }

  deleteCourse(course_title: string) {
    this.deleting = true;
    this.offshoreCourseService.delete(course_title).subscribe({
      next: (response) => {
        this.deleting = false;
        if (response.status == 'success') {
          this.error_in_deleting = null;
          this.navigator.navigate(['/admin/courses']);
        } else this.error_in_deleting = response.message;
      },
    });
  }

  onSubmit(form: HTMLFormElement) {
    this.tried_to_submit = true;
    
    if (this.courseGroup.invalid) return;

      this.submitted = true;
      let formData = new FormData(form);
      this.offshoreCourseService.edit(formData, this.course.title).subscribe({
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
