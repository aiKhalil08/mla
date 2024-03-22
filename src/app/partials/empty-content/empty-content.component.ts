import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-content',
  standalone: true,
  imports: [],
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.css']
})
export class EmptyContentComponent {

  @Input() message: string;
}
