import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-add-event',
    standalone: true,
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent]
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

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {}

  ngOnInit() {
    this.eventGroup = this.formBuilder.group({
      name: [''],
      description: [''],
      date: this.formBuilder.group({
        start: [''],
        duration: [''],
        durationUnit: [''],
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
        let amount = <DurationInputArg1> duration.value;
        let unit = <DurationInputArg2> String(durationUnit.value).toLowerCase();
        console.log('changing end date')
        this.endDate.setValue(moment(startDate.value).add(amount, unit).format('yyyy-MM-DD'));
      }
    });
    console.log('a',this.curFolded);
  }

  get attendees() {
    return <FormArray>this.eventGroup.get('attendees');
  }

  get image() {
    return <FormControl>this.eventGroup.get('image');
  }

  get endDate() {
    return <FormControl>this.eventGroup.get('date').get('end');
  }

  get unit() {
    return <FormControl>this.eventGroup.get('date').get('durationUnit');
  }

  get currency() {
    return <FormControl>this.eventGroup.get('price').get('currency');
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

  addAttendee() {
    this.attendees.push(this.formBuilder.control(''));
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

  handleImageSelect(event: Event, img: HTMLImageElement) {
    let file = (<HTMLInputElement>event.target).files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      img.src = <string>reader.result;
      this.pictureSelected = true;
    };
    if (file) reader.readAsDataURL(file);
  }

  onSubmit(form) {
    this.submitted = true;
    let formData = new FormData(form);
    this.eventService.add(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.created = true;
        this.submitted = false;
      },
    });
  }

}
