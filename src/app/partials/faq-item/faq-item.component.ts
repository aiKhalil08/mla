import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.css']
})
export class FaqItemComponent {
  @Input() faq!: any;
  expanded: boolean = false;

  toggleView() {
    if (this.expanded) {
      this.expanded = false;
    } else this.expanded = true;
  }
}
