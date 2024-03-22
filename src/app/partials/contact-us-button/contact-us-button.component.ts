import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-us-button.component.html',
  styleUrls: ['./contact-us-button.component.css']
})
export class ContactUsButtonComponent {
  @Input() message: string;
  @Input() text: string;
  @Input() theme: 'pink' | 'white';
  @Input() course: {type: string, name: string};


  @HostListener('click', ['$event']) redirect(event) { 
    
    document.location.href = `/contact-for-course?type=${this.course.type}&name=${this.course.name}`;

    // this.router.navigate([`/contact-for-course`,], {queryParams: {'type': this.course.type, 'name': this.course.name}});
    return false;

  }

  constructor(private router: Router) {}
}
