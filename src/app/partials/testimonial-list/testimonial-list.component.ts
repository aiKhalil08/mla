import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { TestimonialItem } from 'src/app/interfaces/testimonial';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { TestimonialItemComponent } from "../testimonial-item/testimonial-item.component";

@Component({
    selector: 'app-testimonial-list',
    standalone: true,
    templateUrl: './testimonial-list.component.html',
    styleUrls: ['./testimonial-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, TestimonialListComponent, TestimonialItemComponent]
})
export class TestimonialListComponent implements OnInit {
  @Input() type!: string;
  @Input() count: number | 'all' = 'all';
  testimonials: TestimonialItem[];
  loaded: boolean = false;
  constructor (private testimonialService: TestimonialService) {}

  ngOnInit() {
    // console.log('we here')
    this.testimonialService.getList(this.count).subscribe({
      next: (response) => {
        console.log(response)
        this.loaded = true;
        this.testimonials = response;
        console.log(response);
      },
    });
  }
}
