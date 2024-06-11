import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event$ } from 'src/app/interfaces/event';
import { ContactUsButtonComponent } from "../../partials/contact-us-button/contact-us-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { WatchlistButtonComponent } from "../../partials/watchlist-button/watchlist-button.component";
import { EmptyContentComponent } from "../../partials/empty-content/empty-content.component";
import { format } from 'date-fns';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { register } from 'swiper/element';




@Component({
    selector: 'app-event',
    standalone: true,
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
    imports: [CommonModule, RouterLink, ContactUsButtonComponent, WatchlistButtonComponent, EmptyContentComponent, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventComponent {
  public event: Event$ | null = null;
  fetching: boolean = false;
  message_text: string;
  watched: boolean;
  no_event: string = null;
  facebookLink: string;
  twitterLink: string;
  linkedInLink: string;
  submitted: boolean;
  registered: boolean;
  errors: object = {};

  slide_delay = 13000;

  present_pop: number = 0;
  
  @ViewChild('carousel_container') carousel_container: ElementRef;
  @ViewChild('enroll_form', {static: false}) enroll_form: ElementRef;

  registrationGroup: FormGroup;
  form_error: string;

  constructor (private eventService: EventService, private route: ActivatedRoute, private auth: AuthService, private watchlist: EventWatchlistService, private change_detector: ChangeDetectorRef, private fb: FormBuilder) {}

  ngOnInit() {
    register();
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      name = param.get('name');
      this.getEvent(name);
    });

    this.registrationGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      message: ['']
    });
  }

  getEvent(name) {
    this.fetching = true;
    this.eventService.get(name).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.no_event = response.message;
          return;
        }
        
        this.event = response.event;

        setTimeout(() => {
          // swiper element
          const swiperEl = document.querySelector('swiper-container');
        
          // swiper parameters
          const swiperParams = {
            slidesPerView: 1,
            // loop: true,
            autoplay: {
              delay: this.slide_delay
            },
            speed: 1000,
          };
        
          // now we need to assign all parameters to Swiper element
          Object.assign(swiperEl, swiperParams);

          swiperEl.addEventListener('swiperslidechange', () => {
            setTimeout(() => {
              if (this.event.popups.length > 1) this.present_pop = (this.present_pop + 1) % this.event.popups.length;
              else if (this.event.popups.length == 1) { // create a "flicker" so that pop in out animation can be executed. pop in out animation is the animation of the texts overlying the slider
                this.present_pop = 10;
                setTimeout(() => { 
                  this.present_pop = 0;               
                }, 20);
              }
            }, 1000);
          })

          // manually trigger pop in out animation since slide won't change if the images_url length is 1
          if (this.event.image_urls.length == 1 && this.event.popups.length > 1) {
            setInterval(() => this.present_pop = (this.present_pop + 1) % this.event.popups.length, this.slide_delay)
          }

          // and now initialize it
          swiperEl.initialize();
        }, 0);
        if (this.auth.isLoggedIn() && this.auth.user().hasRole('student') && this.watchlist.has(this.event.name)) this.watched = true;
        this.message_text = `Hello. I am chatting you regarding ${this.event.name.toUpperCase()}. My name is ___`;

        this.facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(document.location.href)}`;
        this.twitterLink = `https://twitter.com/intent/tweet?url=${encodeURI(document.location.href)}`;
        this.linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(document.location.href)}`;
      }
    });
  }

  get start() {
    return format(this.event.date.start, 'MMM dd ,yyyy');
  }
  get end() {
    return format(this.event.date.end, 'MMM dd ,yyyy');
  }

  scrollToEnrollForm() {
    this.change_detector.detectChanges();
    (<HTMLElement>this.enroll_form.nativeElement).scrollIntoView({behavior: "smooth"});
  }

  onSubmit(form: HTMLFormElement) {
    let form_data = new FormData(form);
    this.submitted = true;

    this.eventService.register(form_data, this.event.name).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.form_error = response.message;
          alert(response.message);
          return;
        }
        this.registered = true;
        this.errors = {};
      }, 
      error: (response) => {
        this.submitted = false;
        this.errors = response.error.errors;
      }
    });
  }
}
