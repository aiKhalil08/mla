import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info-box.component.html',
  styleUrls: ['./user-info-box.component.css']
})
export class UserInfoBoxComponent {
  @Input() parent!: 'sidebar' | 'header';
}
