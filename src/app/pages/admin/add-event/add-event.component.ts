import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { EventService } from 'src/app/services/event.service';
import PostResponse from 'src/app/interfaces/base-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { add, format } from 'date-fns';
import { SwiperContainer, register } from 'swiper/element';

@Component({
    selector: 'app-add-event',
    standalone: true,
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, TooltipComponent, ReportBarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddEventComponent implements OnInit {
  eventGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  created: boolean = false;
  type?: 'virtual' | 'physical';
  tried_to_submit: boolean = false;
  formError: string = null;
  selected_images: any[] = [];
  @ViewChild('imagePreview') image_preview: ElementRef;

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {}

  ngOnInit() {
    register();
    this.eventGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      popups: this.formBuilder.array([]),
      date: this.formBuilder.group({
        start: ['', Validators.required],
        duration: ['', Validators.required],
        durationUnit: ['', Validators.required],
        end: ['']
      }),
      type: [''],
      price: this.formBuilder.group({
        amount: [''],
        currency: ['']
      }),
      attendees: this.formBuilder.array([this.formBuilder.control('')]),
      image: [null],
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
        let interval: object = {};
        interval[String(durationUnit.value).toLowerCase()] = Number(duration.value);

        this.endDate.setValue(format(add(startDate.value, interval), 'yyyy-MM-dd'));
      }
    });

    setTimeout(() => {
    
      // swiper parameters
      const swiperParams = {
        slidesPerView: 1,
        autoplay: {
          delay: 200,
        },
        speed: 800,
        pagination: {
          dynamicBullets: true,
        },
      };
    
      
      Object.assign(this.image_preview.nativeElement, swiperParams);
    
      this.image_preview.nativeElement.initialize();
    }, 0);
  }

  get attendees() {
    return <FormArray>this.eventGroup.get('attendees');
  }

  get popups() {
    return <FormArray>this.eventGroup.get('popups');
  }

  get image() {
    return <FormControl>this.eventGroup.get('image');
  }

  get endDate() {
    return <FormControl>this.eventGroup.get('date').get('end');
  }

  get startDate() {
    return <FormControl>this.eventGroup.get('date').get('start');
  }

  get unit() {
    return <FormControl>this.eventGroup.get('date').get('durationUnit');
  }

  get currency() {
    return <FormControl>this.eventGroup.get('price').get('currency');
  }


  get description() {
    return <FormControl>this.eventGroup.get('description');
  }
  
  get name() {
    return <FormControl>this.eventGroup.get('name');
  }


  get duration() {
    return <FormControl>this.eventGroup.get('date').get('duration');
  }

  get form_invalid() {
    
    return this.eventGroup.invalid;
  }

  add(control: string) {
    let form_array = <FormArray>this.eventGroup.get(control+'s');
    if (control == 'popup') {
      form_array.push(
        this.formBuilder.group({
          heading: [''],
          subheading: [''],
          hashtags: this.formBuilder.array(
            [this.formBuilder.control(''), this.formBuilder.control(''), this.formBuilder.control('')]
          )
        })
      );
    } else form_array.push(this.formBuilder.control(''));
  }
  
  remove(control: string, index?: number) {
    let form_array = <FormArray>this.eventGroup.get(control+'s');
    index = index ?? form_array.length - 1;
    form_array.removeAt(index);
  }

  get_error_message(control: AbstractControl): string | boolean {

    if (!control.errors) return false;

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return true;
    
  }

  setType(event: Event) {
    let target = <HTMLInputElement>event.target;
    this.eventGroup.get('price').get('amount').setValue('');
    if ((target).checked) {
      this.type = <'virtual'|'physical'>target.value;
    }
    else this.type = null;

    console.log(this.type)
  }

  setDurationUnit(unit: string) {
    let input = <HTMLInputElement> document.querySelector('[name="date[duration-unit]"]');
    input.value = unit;
    this.unit.setValue(unit);
    input.dispatchEvent(new Event('change', {bubbles: true}));
    this.folded = !this.folded;
  }

  setCurrency(currency: string) {
    let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
    this.currency.setValue(currency);
    this.curFolded = !this.curFolded;
  }

  handleImageSelect(event: Event) {
    this.selected_images = [];
    let files = (<HTMLInputElement>event.target).files;
    Array.from(files).forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.selected_images.push(<string>reader.result);
        this.pictureSelected = true;
      };
      if (file) reader.readAsDataURL(file);
    });
  }

  
  onSubmit(form: HTMLFormElement) {
    this.tried_to_submit = true;
    
    if (this.eventGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    

    this.eventService.add(formData).subscribe({
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
