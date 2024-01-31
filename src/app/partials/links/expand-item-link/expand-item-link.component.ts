import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expand-item-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expand-item-link.component.html',
  styleUrls: ['./expand-item-link.component.css']
})
export class ExpandItemLinkComponent {
  @Input() text!: string;
  @Input() location!: string;
  @Input() noArrow: boolean = false;
  @Input() smaller_text: boolean = false;
}
