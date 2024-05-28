import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
// import { CartedCourse } from 'src/app/interfaces/carted-course';
import { ModuleItemComponent } from "../module-item/module-item.component";
import { ContactUsButtonComponent } from "../contact-us-button/contact-us-button.component";
import { CertificateService } from 'src/app/services/certificate.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Course, Module } from 'src/app/interfaces/course';

@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [CommonModule, ModuleItemComponent, ContactUsButtonComponent]
})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  @Input() category: string;
  @Input() carted_or_enrolled: 'carted' | 'enrolled';
  @Input() certificate?: {name: string, url: string};
  // @Input() enrollment: 'cohort' | 'individual';
  present_tab: number = 0;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  // date: Date;
  // price: Price;
  abbreviated_type: string;
  course_name: string;
  removing: boolean;


  constructor(private certificateService: CertificateService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {

    // console.log(this.category)

    if (this.category.toLowerCase() == 'certificate course') {
      this.abbreviated_type = 'cc';
      this.course_name = this.course.title+' - '+this.course.code;
    }
    else if (this.category.toLowerCase() == 'certification course') {
      this.abbreviated_type = 'ctc';
      this.course_name = this.course.title+' - '+this.course.code;
    }
    else if (this.category.toLowerCase() == 'offshore course') {
      this.abbreviated_type = 'oc'
      this.course_name = this.course.title;
    }

    this.objectives = this.course.objectives;
    this.modules = this.course.modules;
    this.prerequisites = this.course.prerequisites;
    this.attendees = this.course.attendees;

    // this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.code.toUpperCase()}. My name is ___`;
  }


  show_tab(tab: number) {
    this.present_tab = tab;
  }

  download(certificate: {name: string, url: string}) {
    this.certificateService.download(certificate.url).subscribe({
      next: response => {
        // console.log(response);
        this.handle_download_response(response, certificate.name);
      }
    });
  }

  handle_download_response(response: Blob, name: string) {
    const url = URL.createObjectURL(response);
    const a = document.createElement('a');
    a.href = url;
    a.download = name+" Certificate";
    a.click();
    URL.revokeObjectURL(url);
  }

  get course_identity() {
    if (this.category == 'Offshore course') return this.course.title;
    else return this.course.code;
  }


  remove_from_cart(category: string, identity: string) {
    // console.log(identity); return false;
    this.removing = true;
    this.cartService.remove_course({category, identity}).subscribe({
      next: response => {
        this.removing = false;
        if (response.status == 'success') {
          this.cartService.set_cart(response.cart);
          this.router.navigate(['/home/cart']);
        }
      }
    });
  }
}
