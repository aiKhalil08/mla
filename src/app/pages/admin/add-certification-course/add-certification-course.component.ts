import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { CertificationCourseService } from 'src/app/certification-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-add-certification-course',
    standalone: true,
    templateUrl: './add-certification-course.component.html',
    styleUrls: ['./add-certification-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent]
})
export class AddCertificationCourseComponent implements OnInit {
  courseGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  created: boolean = false;

  constructor(private formBuilder: FormBuilder, private courseService: CertificationCourseService) {}

  ngOnInit() {
    this.courseGroup = this.formBuilder.group({
      code: [''],
      title: [''],
      overview: [''],
      objectives: this.formBuilder.array([this.formBuilder.control('')]),
      attendees: this.formBuilder.array([this.formBuilder.control('')]),
      prerequisites: this.formBuilder.array([this.formBuilder.control('')]),
      modules: this.formBuilder.array([this.formBuilder.group({
        objective: [''],
        overview: ['']
      })]),
      // date: this.formBuilder.group({
      //   start: [''],
      //   duration: [''],
      //   durationUnit: [''],
      //   end: ['']
      // }),
      price: this.formBuilder.group({
        amount: [''],
        currency: ['']
      }),
      discount: [''],
      image: [null],
      // schedule: [null],
    });

    // let startDate = <HTMLInputElement> document.querySelector('[name="date[start]"]');
    // let duration = <HTMLInputElement> document.querySelector('[name="date[duration]"]');
    // let durationUnit = <HTMLInputElement> document.querySelector('[name="date[duration-unit]"]');
    // let endDate = <HTMLInputElement> document.querySelector('[name="date[end]"]');
    // let startChange$ = fromEvent(startDate, 'input');
    // let durationChange$ = fromEvent(duration, 'input');
    // let unitChange$ = fromEvent(durationUnit, 'change');

    // let lake$ = merge(startChange$, durationChange$, unitChange$);
    // this.dateStream$ = lake$.pipe(
    //   map(e => (<HTMLInputElement> e.target).value),
    //   filter(e => e.length > 0),
    //   debounceTime(100),
    //   distinctUntilChanged()
    // );

    // this.dateStream$.subscribe(e => {
    //   if ([startDate, duration, durationUnit].filter((element)=>element.value !== e).every((element) => element.value != '')) {
    //     let amount = <DurationInputArg1> duration.value;
    //     let unit = <DurationInputArg2> String(durationUnit.value).toLowerCase();
    //     console.log('changing end date')
    //     this.endDate.setValue(moment(startDate.value).add(amount, unit).format('yyyy-MM-DD'));
    //   }
    // });
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

  handleImageSelect(event: Event, img: HTMLImageElement) {
    let file = (<HTMLInputElement>event.target).files[0];
    // this.image.setValue(file);
    // console.log(file)
    // console.log(this.image);
    // this.courseGroup.patchValue({'image': file});
    let reader = new FileReader();
    // let image = new FileReader();
    // image.onloadend = () => {
    //   this.imageFile = reader.result;
    //   console.log(this.imageFile);
    // };
    // if (file) image.readAsBinaryString(file);
    reader.onloadend = () => {
      img.src = <string>reader.result;
      this.pictureSelected = true;
    };
    if (file) reader.readAsDataURL(file);
  }

  handleScheduleSelect(event: Event, embed: HTMLEmbedElement) {
    console.log('in handle schedule select');
    let file = (<HTMLInputElement>event.target).files[0];
    // this.image.setValue(file);
    // console.log(file)
    // console.log(this.image);
    // this.courseGroup.patchValue({'image': file});
    let reader = new FileReader();
    // let image = new FileReader();
    // image.onloadend = () => {
    //   this.imageFile = reader.result;
    //   console.log(this.imageFile);
    // };
    // if (file) image.readAsBinaryString(file);
    reader.onloadend = () => {
      // console.log('in loadend', reader.result);
      // console.log('result of URL.create', URL.createObjectURL(file))
      embed.src = URL.createObjectURL(file);
      this.scheduleSelected = true;
    };
    // URL.createObjectURL(file)
    if (file) reader.readAsDataURL(file);
  }

  // setEndDate(event: Event) {
  //   let startDate = <HTMLInputElement> document.querySelector('[name="start"]');
  //   let duration = <HTMLInputElement> document.querySelector('[name="duration"]');
  //   let durationUnit = <HTMLInputElement> document.querySelector('[name="duration-unit"]');
  //   let endDate = <HTMLInputElement> document.querySelector('[name="end"]');
    
  //   this.dateStream$.subscribe(e => {
  //     console.log('end of stream')
  //     if ([startDate, duration, durationUnit].filter((element)=>element !== event.target).every((element) => element.value != '')) {
  //       console.log('now')
  //       let amount = <DurationInputArg1> duration.value;
  //       let unit = <DurationInputArg2> String(durationUnit.value).toLowerCase();
  //       console.log(moment().add(amount, unit).format());
      
  //       endDate.value = moment().add(amount, unit).format('yyyy-MM-DD');
  //     }
  //   });
  // }

  onSubmit(form) {
    // console.log('form has been submitted');
    // console.clear();
    this.submitted = true;
    // console.log(this.courseGroup.value);
    // console.log(this.imageFile);
    let formData = new FormData(form);
    // console.log(form);
    // console.log(formData)
    // console.log(formData.get('code'));
    // console.log(formData.getAll('objectives[]'));
    // console.log(formData.get('modules[]'))
    // console.log(formData.get('image'))
    // console.log(formData.get('course-code'), formData.get('course-title'), formData.get('course-image'));
    // for (let key in this.courseGroup.value) {
    //   formData.append(key, this.courseGroup.value[key]);
    // }
    // console.log(form);
    // console.log(formData);
    // // this.courseService.ret().subscribe({
    // //   next: (response) => console.log(response),
    // // });
    this.courseService.add(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.created = true;
        this.submitted = false;
      },
    });
    // this.courseService.add(this.courseGroup).subscribe({
    //   next: (response) => console.log(response),
    // });
  }

}
