import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-do-more-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './do-more-link.component.html',
  styleUrls: ['./do-more-link.component.css']
})
export class DoMoreLinkComponent {
  @Input() text!: string;
  @Input() location!: string;
}
