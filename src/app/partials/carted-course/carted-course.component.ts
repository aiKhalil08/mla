// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { CartedCourse } from 'src/app/interfaces/carted-course';
// import { Module } from 'src/app/interfaces/certificate-course';
// import { ModuleItemComponent } from "../module-item/module-item.component";
// import { ContactUsButtonComponent } from "../contact-us-button/contact-us-button.component";

// @Component({
//     selector: 'app-carted-course',
//     standalone: true,
//     templateUrl: './carted-course.component.html',
//     styleUrls: ['./carted-course.component.css'],
//     imports: [CommonModule, ModuleItemComponent, ContactUsButtonComponent]
// })
// export class CartedCourseComponent implements OnInit {

//   @Input() course: CartedCourse;
//   @Input() type: string;
//   present_tab: number = 0;
//   objectives: string[];
//   modules: Module[];
//   prerequisites: string[];
//   attendees: string[];
//   // message_text: string;
//   abbreviated_type: string;
//   course_name: string;

//   ngOnInit(): void {

//     if (this.type.toLowerCase() == 'certificate course') {
//       this.abbreviated_type = 'cc';
//       this.course_name = this.course.title+' - '+this.course.code;
//     }
//     else if (this.type.toLowerCase() == 'certification course') {
//       this.abbreviated_type = 'ctc';
//       this.course_name = this.course.title+' - '+this.course.code;
//     }
//     else if (this.type.toLowerCase() == 'offshore course') {
//       this.abbreviated_type = 'oc'
//       this.course_name = this.course.title;
//     }

//     this.objectives = <string[]>JSON.parse(this.course.objectives);
//     this.modules = <Module[]>JSON.parse(this.course.modules);
//     this.prerequisites = <string[]>JSON.parse(this.course.prerequisites);
//     this.attendees = <string[]>JSON.parse(this.course.attendees);

//     // this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.code.toUpperCase()}. My name is ___`;
//   }


//   show_tab(tab: number) {
//     this.present_tab = tab;
//   }
// }
