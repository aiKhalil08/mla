import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { OffshoreCourseService } from 'src/app/services/offshore-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import PostResponse from 'src/app/interfaces/post-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";

@Component({
    selector: 'app-add-offshore-course',
    standalone: true,
    templateUrl: './add-offshore-course.component.html',
    styleUrls: ['./add-offshore-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, TooltipComponent, ReportBarComponent]
})
export class AddOffshoreCourseComponent implements OnInit {
  courseGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  locFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  created: boolean = false;
  tried_to_submit: boolean = false;
  formError: string = null;

  constructor(private formBuilder: FormBuilder, private courseService: OffshoreCourseService) {}

  ngOnInit() {
    this.courseGroup = this.formBuilder.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      objectives: this.formBuilder.array([this.formBuilder.control('')]),
      attendees: this.formBuilder.array([this.formBuilder.control('')]),
      prerequisites: this.formBuilder.array([this.formBuilder.control('')]),
      modules: this.formBuilder.array([this.formBuilder.group({
        objective: [''],
        overview: ['']
      })]),
      date: this.formBuilder.group({
        start: [''],
        duration: [''],
        durationUnit: [''],
        end: ['']
      }),
      price: this.formBuilder.group({
        amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        currency: ['', Validators.required]
      }),
      location: ['', Validators.required],
      discount: ['', Validators.pattern(/^\d+$/)],
      image: [null],
      // schedule: [null],
    });

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
        let amount = <DurationInputArg1> duration.value;
        let unit = <DurationInputArg2> String(durationUnit.value).toLowerCase();
        console.log('changing end date')
        this.endDate.setValue(moment(startDate.value).add(amount, unit).format('yyyy-MM-DD'));
      }
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

  addObjective() {
    this.objectives.push(this.formBuilder.control(''));
  }
  addAttendee() {
    this.attendees.push(this.formBuilder.control(''));
  }
  addPrerequisite() {
    this.prerequisites.push(this.formBuilder.control(''));
  }
  addModule() {
    this.modules.push(this.formBuilder.group({
      objective: [''],
      overview: ['']
    }));
    console.log(this.modules);
  }

  setDurationUnit(unit: string) {
    // this.currency.setValue(unit);
    let input = <HTMLInputElement> document.querySelector('[name="date[duration-unit]"]');
    input.value = unit;
    // console.log(this.unit, this.unit.value)
    this.unit.setValue(unit);
    input.dispatchEvent(new Event('change', {bubbles: true}));
    this.folded = !this.folded;
  }

  setCurrency(currency: string) {
    let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
    // input.value = unit;
    // this.unit.setValue(currency)
    this.currency.setValue(currency);
    // input.dispatchEvent(new Event('change', {bubbles: true}));
    this.curFolded = !this.curFolded;
  }

  setLocation(location: string) {
    let input = <HTMLInputElement> document.querySelector('[name="location"]');
    this.location.setValue(location);
    this.locFolded = !this.locFolded;
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    let file = (<HTMLInputElement>event.target).files[0];
    
    let reader = new FileReader();
    
    reader.onloadend = () => {
      img.src = <string>reader.result;
      this.pictureSelected = true;
    };
    if (file) reader.readAsDataURL(file);
  }

  handleScheduleSelect(event: Event, embed: HTMLEmbedElement) {
    console.log('in handle schedule select');
    let file = (<HTMLInputElement>event.target).files[0];
    let reader = new FileReader();
    
    reader.onloadend = () => {
      
      embed.src = URL.createObjectURL(file);
      this.scheduleSelected = true;
    };
    if (file) reader.readAsDataURL(file);
  }



  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.courseGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    

    this.courseService.add(formData).subscribe({
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
    this.created = true;
  }

}
