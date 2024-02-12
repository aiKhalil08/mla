import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItem } from 'src/app/interfaces/event';
import moment from 'moment';
import { Date } from 'src/app/interfaces/certificate-course';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";

@Component({
    selector: 'app-event-item',
    standalone: true,
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.css'],
    imports: [CommonModule, ExpandItemLinkComponent]
})
export class EventItemComponent {
  @Input() event!: EventItem;
  constructor() {
    console.log(this.event)
  }

  get start() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('MMM DD');
  }
  get end() {
    return moment((<Date>JSON.parse(this.event.date)).end).format('MMM DD');
  }
  get year() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('yyyy');
  }
}
