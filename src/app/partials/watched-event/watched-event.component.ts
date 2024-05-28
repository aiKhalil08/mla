import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsButtonComponent } from "../contact-us-button/contact-us-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { format } from 'date-fns';
import { Event$ } from 'src/app/interfaces/event';

@Component({
    selector: 'app-watched-event',
    standalone: true,
    templateUrl: './watched-event.component.html',
    styleUrls: ['./watched-event.component.css'],
    imports: [CommonModule, ContactUsButtonComponent]
})
export class WatchedEventComponent implements OnInit {
  @Input() event: Event$;
  attendees: string[];
  message_text: string;


  constructor(private auth: AuthService) {}

  ngOnInit(): void {

    // console.log(this.event)
    this.attendees = this.event.attendees;

    this.message_text = `Hello. I am ${this.auth.user().first_name} ${this.auth.user().last_name} and I am chatting you regarding ${this.event.name.toUpperCase()}.`;
  }


  get start() {
    return format(this.event.date.start, 'MMM dd, yyy');
  }
  get end() {
    return format(this.event.date.end, 'MMM dd, yyy');
  }

}
