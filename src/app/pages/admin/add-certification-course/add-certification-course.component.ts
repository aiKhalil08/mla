import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificationCourseService } from 'src/app/services/certification-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import PostResponse from 'src/app/interfaces/post-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';

@Component({
    selector: 'app-add-certification-course',
    standalone: true,
    templateUrl: './add-certification-course.component.html',
    styleUrls: ['./add-certification-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ReportBarComponent, TooltipComponent]
})
export class AddCertificationCourseComponent implements OnInit {
  courseGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  created: boolean = false;
  tried_to_submit: boolean = false;
  formError: string = null;

  constructor(private formBuilder: FormBuilder, private courseService: CertificationCourseService) {}

  ngOnInit() {
    this.courseGroup = this.formBuilder.group({
      code: ['', Validators.required],
      title: ['', Validators.required],
      overview: ['', Validators.required],
      objectives: this.formBuilder.array([this.formBuilder.control('')]),
      attendees: this.formBuilder.array([this.formBuilder.control('')]),
      prerequisites: this.formBuilder.array([this.formBuilder.control('')]),
      modules: this.formBuilder.array([this.formBuilder.group({
        objective: [''],
        overview: ['']
      })]),
      image: [null],
      // schedule: [null],
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

  // setCurrency(currency: string) {
  //   let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
  //   // input.value = unit;
  //   // this.unit.setValue(currency)
  //   this.currency.setValue(currency);
  //   // input.dispatchEvent(new Event('change', {bubbles: true}));
  //   this.curFolded = !this.curFolded;
  // }

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
