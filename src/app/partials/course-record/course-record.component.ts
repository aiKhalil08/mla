import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-record.component.html',
  styleUrl: './course-record.component.css'
})
export class CourseRecordComponent {
  @Input() object: object;
  @Input() object_name: string;
}
