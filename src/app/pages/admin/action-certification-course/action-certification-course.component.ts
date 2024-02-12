import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
// import { CourseService } from 'src/app/course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CertificationCourse, Date, Module, Price } from 'src/app/interfaces/certification-course';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { CertificationCourseService } from 'src/app/services/certification-course.service';

@Component({
    selector: 'app-action-certification-course',
    standalone: true,
    templateUrl: './action-certification-course.component.html',
    styleUrls: ['./action-certification-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent]
})
export class ActionCertificationCourseComponent implements OnInit {
  course!: CertificationCourse;
  // course_code!: string;
  courseGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = true;
  scheduleSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;

  constructor(private formBuilder: FormBuilder, private certificationCourseService: CertificationCourseService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let course_code;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_code = param.get('course_code')});
    this.certificationCourseService.get(course_code).subscribe({
      next: (response) => {
        this.course = response;
        console.log(this.course);
        this.courseGroup = this.formBuilder.group({
          code: [this.course.code],
          title: [this.course.title],
          overview: [this.course.overview],
          objectives: this.formBuilder.array((<string[]>JSON.parse(this.course.objectives)).map(objective => this.formBuilder.control(objective))),
          attendees: this.formBuilder.array((<string[]>JSON.parse(this.course.attendees)).map(attendee => this.formBuilder.control(attendee))),
          prerequisites: this.formBuilder.array((<string[]>JSON.parse(this.course.prerequisites)).map(prerequisite => this.formBuilder.control(prerequisite))),
          modules: this.formBuilder.array(
            (<Module[]>JSON.parse(this.course.modules)).map(module => this.formBuilder.group({
              objective: [module.objective],
              overview: [module.overview]
            }))),
          // date: this.formBuilder.group({
          //   start: [(<Date>JSON.parse(this.course.date)).start],
          //   duration: [(<Date>JSON.parse(this.course.date)).duration],
          //   durationUnit: [(<Date>JSON.parse(this.course.date))['duration-unit']],
          //   end: [(<Date>JSON.parse(this.course.date)).end]
          // }),
          price: this.formBuilder.group({
            amount: [(<Price>JSON.parse(this.course.price)).amount],
            currency: [(<Price>JSON.parse(this.course.price)).currency]
          }),
          discount: [this.course.discount],
          image: [null],
          // schedule: [null],
        });
        setTimeout(()=>{
          (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.course.image_url;
          // (<HTMLEmbedElement>document.querySelector('#schedulePreview')).src = this.course.schedule_url;
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
      // input.value = unit;
      // this.unit.setValue(currency)
      this.currency.setValue(currency);
      // input.dispatchEvent(new Event('change', {bubbles: true}));
      this.curFolded = !this.curFolded;
    }
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    if (this.editable) {
      let file = (<HTMLInputElement>event.target).files[0];
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
  }

  handleScheduleSelect(event: Event, embed: HTMLEmbedElement) {
    if (this.editable) {
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

  dosome(some) {
    console.log('has been clicked', this.editable, some.target);
    this.editable = true;
    console.log(this.editable)
  }

  deleteCourse(course_code: string) {
    this.certificationCourseService.delete(course_code).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.navigator.navigate(['/admin/courses']);
        }
      },
    });
  }

  onSubmit(form) {
    if (this.editable) {
      this.submitted = true;
      let formData = new FormData(form);
      this.certificationCourseService.edit(formData, this.course.code).subscribe({
        next: (response) => {
          console.log(response);
          this.edited = true;
          this.submitted = false;
        },
      });
    }
  }
}
