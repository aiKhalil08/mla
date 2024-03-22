import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-enroll-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './enroll-button.component.html',
  styleUrls: ['./enroll-button.component.css']
})
export class EnrollButtonComponent implements OnInit {
// [x: string]: any;
  @Input() hasArrow!: boolean;
  @Input() bgColor!: 'primary' | 'white';
  @Input() radius!: 'curved' | 'slight' | null;
  @Input() location!: string;
  @Input() link!: string;
  @Input() butText!: string;
  @Input() id: string | '' = '';

  

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  navigate() {
    if (this.link) window.location.href = this.link;
    else this.router.navigate([this.location]);
  }
}
