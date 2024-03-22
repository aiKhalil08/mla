import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { Event$ } from 'src/app/interfaces/event';
import { Price, Date } from 'src/app/interfaces/certificate-course';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-action-event',
    standalone: true,
    templateUrl: './action-event.component.html',
    styleUrls: ['./action-event.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent]
})
export class ActionEventComponent implements OnInit {
  eventGroup!: FormGroup;
  folded: boolean = true;
  curFolded: boolean = true;
  dateStream$!: Observable<string>;
  pictureSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  type?: 'virtual' | 'physical';
  event!: Event$;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    this.eventService.get(name).subscribe({
      next: (response) => {
        this.event = response;
        console.log(this.event);
        this.eventGroup = this.formBuilder.group({
          name: [this.event.name],
          description: [this.event.description],
          date: this.formBuilder.group({
            start: [(<Date>JSON.parse(this.event.date)).start],
            duration: [(<Date>JSON.parse(this.event.date)).duration],
            durationUnit: [(<Date>JSON.parse(this.event.date))['duration-unit']],
            end: [(<Date>JSON.parse(this.event.date)).end]
          }),
          type: [this.event.type],
          price: this.formBuilder.group({
            amount: [(<Price>JSON.parse(this.event.price)).amount],
            currency: [(<Price>JSON.parse(this.event.price)).currency]
          }),
          attendees: this.formBuilder.array((<string[]>JSON.parse(this.event.attendees)).map(attendee => this.formBuilder.control(attendee))),
          image: [null],
        });
        setTimeout(()=>{
          let physicalInput = <HTMLInputElement>document.querySelector('[id="physical-price"]');
          let virtualInput = <HTMLInputElement>document.querySelector('[id="virtual-price"]');
          if (this.event.type == 'virtual') physicalInput.value = '';
          else virtualInput.value = '';
          (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.event.image_url;
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
        }, 0);
      },
    });
  }

  get endDate() {
    return <FormControl>this.eventGroup.get('date').get('end');
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

  setType(event: Event) {
    let target = <HTMLInputElement>event.target;
    this.eventGroup.get('price').get('amount').setValue('');
    if ((target).checked) {
      this.type = <'virtual'|'physical'>target.value;
    }
    else this.type = null;
  }

  setCurrency(currency: string) {
    if (this.editable) {
      let input = <HTMLInputElement> document.querySelector('[name="price[currency]"]');
      this.currency.setValue(currency);
      this.curFolded = !this.curFolded;
    }
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    console.log('in handle')
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

  deleteEvent(heading: string) {
    this.eventService.delete(heading).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.navigator.navigate(['/admin/resources']);
        }
      },
    });
  }

  addAttendee() {
    if (this.editable) this.attendees.push(this.formBuilder.control(''));
  }

  onSubmit(form) {
    if (this.editable || !this.submitted) {
      this.submitted = true;
      let formData = new FormData(form);
      this.eventService.edit(formData, this.event.name).subscribe({
        next: (response) => {
          // console.log(response);
          this.edited = true;
          this.submitted = false;
        },
      });
    }
  }
}