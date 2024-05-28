import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { Event$ } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import PostResponse from 'src/app/interfaces/base-response';
import { add, format } from 'date-fns';
import { register } from 'swiper/element';

@Component({
    selector: 'app-action-event',
    standalone: true,
    templateUrl: './action-event.component.html',
    styleUrls: ['./action-event.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent, EmptyContentComponent, ReportBarComponent, TooltipComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActionEventComponent implements OnInit {
  eventGroup!: FormGroup;
  fetching: boolean = false;
  no_event: string = null;
  folded: boolean = true;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  type?: 'virtual' | 'physical';
  event!: Event$;
  deleting: boolean = false;
  error_in_deleting: string = null;
  tried_to_submit: boolean = false;
  formError: string = null;
  selected_images: string[] = [];
  swiper: any;
  @ViewChild('imagePreview', {static: false}) image_preview: ElementRef;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    register();
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    
    this.fetch_event(name);
  }

  fetch_event(name: string) {
    this.fetching = true;
    this.eventService.get(name).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.no_event = response.message;
          return;
        }
        this.event = response.event;
        this.eventGroup = this.formBuilder.group({
          name: [this.event.name, Validators.required],
          description: [this.event.description, Validators.required],
          date: this.formBuilder.group({
            start: [this.event.date.start, Validators.required],
            duration: [this.event.date.duration, Validators.required],
            durationUnit: [this.event.date['duration-unit'], Validators.required],
            end: [this.event.date.end, Validators.required]
          }),
          type: [this.event.type],
          price: this.formBuilder.group({
            amount: [this.event.price.amount],
            currency: [this.event.price.currency]
          }),
          attendees: this.formBuilder.array(this.event.attendees.map(attendee => this.formBuilder.control(attendee))),
          image: [null],
        });


        if (this.event.type) this.setType(this.event.type);


        setTimeout(()=>{
          let physicalInput = <HTMLInputElement>document.querySelector('[id="physical-price"]');
          let virtualInput = <HTMLInputElement>document.querySelector('[id="virtual-price"]');
          if (this.event.type == 'virtual') physicalInput.value = '';
          else virtualInput.value = '';
          if (this.event.image_urls) {
            this.pictureSelected = true;
            // (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.event.image_url;
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
            this.swiper = this.image_preview.nativeElement.swiper;
            this.event.image_urls.forEach(url => this.selected_images.push(url));
          }
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

  get endDate() {
    return <FormControl>this.eventGroup.get('date').get('end');
  }

  get startDate() {
    return <FormControl>this.eventGroup.get('date').get('start');
  }

  get attendees() {
    return <FormArray>this.eventGroup.get('attendees');
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

  get_error_message(control: AbstractControl): string | boolean {

    if (!control.errors) return false;

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return true;
    
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

  setType(event: Event | string) {

    if (typeof event == 'string')
    this.type = <'virtual'|'physical'>event;
    else {

      let target = <HTMLInputElement>event.target;
      this.eventGroup.get('price').get('amount').setValue('');
      if ((target).checked) {
        this.type = <'virtual'|'physical'>target.value;
      }
      else this.type = null;
    }

  }

  setCurrency(currency: string) {
    if (this.editable) {
      let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
      this.currency.setValue(currency);
      this.curFolded = !this.curFolded;
    }
  }

  handleImageSelect(event: Event) {
    this.selected_images = [];
    let files = (<HTMLInputElement>event.target).files;
    Array.from(files).forEach((file, i) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.selected_images.push(<string>reader.result);
        if (i == files.length - 1) {
          this.pictureSelected = true;
          setTimeout(() => {
            this.swiper.update();
            // console.log('updated')
          }, 0);
        }
      };
      if (file) reader.readAsDataURL(file);
    });
  }
  

  addAttendee() {
    if (this.editable) this.attendees.push(this.formBuilder.control(''));
  }
  
  deleteEvent(heading: string) {
    this.deleting = true;
    this.error_in_deleting = null;
    this.eventService.delete(heading).subscribe({
      next: (response) => {
        this.deleting = false;
        if (response.status == 'success') {
          this.navigator.navigate(['/admin/events']);
        } else this.error_in_deleting = response.message;
      },
    });
  }

  onSubmit(form: HTMLFormElement) {
    this.tried_to_submit = true;
    
    if (this.eventGroup.invalid) return;

      this.submitted = true;
      let formData = new FormData(form);
      this.eventService.edit(formData, this.event.name).subscribe({
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