import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { WatchedEvent } from 'src/app/interfaces/watched-event';
import { Date } from 'src/app/interfaces/certificate-course';
import { CommonModule } from '@angular/common';
import { ContactUsButtonComponent } from "../contact-us-button/contact-us-button.component";

@Component({
    selector: 'app-watched-event',
    standalone: true,
    templateUrl: './watched-event.component.html',
    styleUrls: ['./watched-event.component.css'],
    imports: [CommonModule, ContactUsButtonComponent]
})
export class WatchedEventComponent implements OnInit {
  @Input() event: WatchedEvent;
  attendees: string[];
  message_text: string;

  ngOnInit(): void {

    console.log(this.event)
    this.attendees = <string[]>JSON.parse(this.event.attendees);

    this.message_text = `Hello. I am chatting you regarding ${this.event.name.toUpperCase()}. My name is ___`;
  }


  get start() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('MMM DD, yyyy');
  }
  get end() {
    return moment((<Date>JSON.parse(this.event.date)).end).format('MMM DD, yyyy');
  }
  get year() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('yyyy');
  }


}
