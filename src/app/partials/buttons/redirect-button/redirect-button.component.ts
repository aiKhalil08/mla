import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-redirect-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './redirect-button.component.html',
  styleUrls: ['./redirect-button.component.css']
})
export class RedirectButtonComponent {
  @Input() location!: string;
  @Input() text!: string;
  @Input() theme!: 'white' | 'pink';
}
