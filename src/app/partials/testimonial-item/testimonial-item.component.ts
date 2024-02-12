import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialItem } from 'src/app/interfaces/testimonial';

@Component({
  selector: 'app-testimonial-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.css']
})
export class TestimonialItemComponent {
  @Input() testimonial!: TestimonialItem;
}
