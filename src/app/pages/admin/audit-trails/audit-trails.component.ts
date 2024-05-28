import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuditTrail } from 'src/app/interfaces/audit-trail';
import { AuditService } from 'src/app/services/audit.service';
import { AuditTrailComponent } from "../../../partials/audit-trail/audit-trail.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatISO, isAfter, isBefore, isEqual, toDate } from 'date-fns';

@Component({
    selector: 'app-audit-trails',
    standalone: true,
    templateUrl: './audit-trails.component.html',
    styleUrl: './audit-trails.component.css',
    imports: [CommonModule, AuditTrailComponent, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
    providers: [provideNativeDateAdapter()]
})
export class AuditTrailsComponent implements OnInit {

  trails: AuditTrail[];
  fetching: boolean = false;
  stringFilter: FormControl;
  dateFilter: FormControl;
  slide: FormControl;
  filterByString: boolean = false;
  filterByDate: boolean = false;

  // search_input_stream: Observable<Event>;
  search_string: string;
  search_start_date: Date;
  search_end_date: Date;

  // @ViewChild('search_field', {static: false}) search_field: ElementRef;
  search_string_control: FormControl<string>;
  search_start_date_control: FormControl<string>;
  search_end_date_control: FormControl<string>;


  constructor(private auditService: AuditService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.stringFilter = new FormControl();
    this.dateFilter = new FormControl();
    this.search_string_control = new FormControl();
    this.search_start_date_control = new FormControl();
    this.search_end_date_control = new FormControl();

    this.stringFilter.valueChanges.subscribe(value => {
      this.filterByString = value;
      if (value == true) {
        this.changeDetector.detectChanges();
        this.setSearchField();
      } else {
        this.search_string_control.setValue('');
      }
    });

    this.dateFilter.valueChanges.subscribe(value => {
      this.filterByDate = value;
      if (value == true) {
        this.changeDetector.detectChanges();
        this.setDateRangePicker();
      } else {
        this.search_start_date_control.setValue('');
        this.search_end_date_control.setValue('');
      }
    });

    this.fetchTrails();
  }

  fetchTrails() {
    this.fetching = true;

    this.auditService.fetchAuditTrails().subscribe({
      next: (response) => {
        this.fetching = false;
        this.handleResponse(response);
      }
    });
  }

  handleResponse(response: { trails: AuditTrail[]; }) {
    this.trails = response.trails;
  }

  setSearchField() {
    this.search_string_control.valueChanges
    .pipe(debounceTime(100))
    .subscribe(string => this.search_string = string);
  }

  setDateRangePicker() {
    this.search_start_date_control.valueChanges.subscribe(date => {
      if (!date) return;
      if (this.search_end_date && isAfter(toDate(date), toDate(this.search_end_date))) {
        this.search_end_date_control.setValue(formatISO(toDate(date)));
      }

      this.search_start_date = toDate(date);
    });
    this.search_end_date_control.valueChanges.subscribe(date => {
      if (!date) return;
      if (this.search_start_date && isBefore(toDate(date), toDate(this.search_start_date))) {
        this.search_start_date_control.setValue(formatISO(toDate(date)));
      }

      this.search_end_date = toDate(date);
    });
  }

  checkStringMatch(trail: AuditTrail): any {
    if (!this.search_string) return true;

    if ((String(trail.actor.first_name).toLowerCase().search(this.search_string.toLowerCase()) >= 0) ||
    (String(trail.actor.last_name).toLowerCase().search(this.search_string.toLowerCase()) >= 0) ||
    (String(trail.actor.type).toLowerCase().search(this.search_string.toLowerCase()) >= 0) ||
    (String(trail.action).toLowerCase().search(this.search_string.toLowerCase()) >= 0)) return true;
    
    return false;
  }

  checkDateMatch(trail: AuditTrail): any {
    if (!this.search_start_date && !this.search_end_date) return true;

    let trail_day = trail.date.split(' ')[0]+' 00:00:00'; //splits away the hours, mins and sec and only picks the day

    if (this.search_start_date && this.search_end_date) {
      if ((isAfter(toDate(trail_day), this.search_start_date) || isEqual(toDate(trail_day), this.search_start_date)) && (isBefore(toDate(trail_day), this.search_end_date) || isEqual(toDate(trail_day), this.search_end_date))) return true;
    } else if (this.search_start_date) {
      if (isAfter(toDate(trail_day), this.search_start_date) || isEqual(toDate(trail_day), this.search_start_date)) return true;
    } else if (this.search_end_date) {
      if (isBefore(toDate(trail_day), this.search_end_date) || isEqual(toDate(trail_day), this.search_end_date)) return true;
    }
    
    return false;
  }
}
