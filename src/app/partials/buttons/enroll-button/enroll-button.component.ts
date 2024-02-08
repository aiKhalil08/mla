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
  

  constructor(private router: Router){}

  ngOnInit(): void {
    // console.log(this.butText, this.link);
    // if (this.link) {
    //   console.log(this.butText, 'inside link setter')
    //   let a = document.querySelector('a');
    //   console.log('present link', a.href)
    //   a.href = this.link;
    //   console.log('after setting link', a.href)
    // }
  }

  navigate() {
    if (this.link) window.open(this.link, '_blank')
    else this.router.navigate([this.location]);
  }
}
