import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enroll-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enroll-button.component.html',
  styleUrls: ['./enroll-button.component.css']
})
export class EnrollButtonComponent {
[x: string]: any;
  @Input() hasArrow!: boolean;
  @Input() bgColor!: 'primary' | 'white';
  @Input() radius!: 'curved' | 'slight' | null;
  @Input() location!: string;
  @Input() butText!: string;
}
