import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// import { CourseService } from 'src/app/course.service';
import { CertificateCourseService } from 'src/app/services/certificate-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { TooltipComponent } from "../../../partials/tooltip/tooltip.component";
import PostResponse from 'src/app/interfaces/base-response';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";

@Component({
    selector: 'app-add-certificate-course',
    standalone: true,
    templateUrl: './add-certificate-course.component.html',
    styleUrls: ['./add-certificate-course.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, TooltipComponent, ReportBarComponent]
})
export class AddCertificateCourseComponent implements OnInit {
  courseGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  scheduleSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  created: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  constructor(private formBuilder: FormBuilder, private certificateCourseService: CertificateCourseService) {}

  ngOnInit() {
    this.courseGroup = this.formBuilder.group({
      code: ['', Validators.required],
      title: ['', Validators.required],
      overview: ['', Validators.required],
      objectives: this.formBuilder.array([]),
      attendees: this.formBuilder.array([]),
      prerequisites: this.formBuilder.array([]),
      modules: this.formBuilder.array([]),
      price: this.formBuilder.group({
        amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        currency: ['', Validators.required]
      }),
      discount: ['', Validators.pattern(/^\d+$/)],
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
    let input = <HTMLInputElement> document.querySelector('[name="date[duration-unit]"]');
    input.value = unit;
    // console.log(this.unit, this.unit.value)
    this.unit.setValue(unit);
    input.dispatchEvent(new Event('change', {bubbles: true}));
    this.folded = !this.folded;
  }

  setCurrency(currency: string) {
    let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
    this.currency.setValue(currency);
    this.curFolded = !this.curFolded;
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
      // console.log('in loadend', reader.result);
      // console.log('result of URL.create', URL.createObjectURL(file))
      embed.src = URL.createObjectURL(file);
      this.scheduleSelected = true;
    };
    // URL.createObjectURL(file)
    if (file) reader.readAsDataURL(file);
  }


  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.courseGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    

    this.certificateCourseService.add(formData).subscribe({
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
