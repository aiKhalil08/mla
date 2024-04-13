import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { TestimonialItem } from 'src/app/interfaces/testimonial';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { TestimonialItemComponent } from "../testimonial-item/testimonial-item.component";
import { register } from 'swiper/element/bundle';

@Component({
    selector: 'app-testimonial-list',
    standalone: true,
    templateUrl: './testimonial-list.component.html',
    styleUrls: ['./testimonial-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, TestimonialListComponent, TestimonialItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestimonialListComponent implements OnInit {
  @Input() type!: string;
  @Input() count: number | 'all' = 'all';
  @Output() no_testimonials = new EventEmitter();
  testimonials: TestimonialItem[];
  loaded: boolean = false;
  constructor (private testimonialService: TestimonialService) {}

  ngOnInit() {

    register();
    // console.log('we here')
    this.testimonialService.getList(this.count).subscribe({
      next: (response) => {
        // console.log(response)
        this.loaded = true;
        this.testimonials = response;


         setTimeout(() => {
          // swiper element
          const swiperEl = document.querySelector('swiper-container');
        
          // swiper parameters
          const swiperParams = {
            slidesPerView: 1,
            navigation: true,
            loop: true,
            spaceBetween: 16,
            centerInsufficientSlides: true,
            pagination: {
              dynamicBullets: true,
            },
            breakpoints: {
              560: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            },
          };
        
          // now we need to assign all parameters to Swiper element
          Object.assign(swiperEl, swiperParams);
        
          // and now initialize it
          swiperEl.initialize();
        }, 0);
        
        // console.log(response);
        if (this.testimonials.length == 0) this.no_testimonials.emit();
      },
    });
  }
}
