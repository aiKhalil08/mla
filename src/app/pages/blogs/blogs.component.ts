import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { RouterLink } from '@angular/router';

interface Blog {
  title: string,
  date: string,
  body: string,
  author: string,
  img_src: string
}
@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css'],
    imports: [CommonModule, EnrollButtonComponent, RouterLink]
})
export class BlogsComponent {
  blogs: Blog[] = [
    {
      title: "Governance, Risk and Compliance",
      date: "January 23, 2023",
      body: "Every organisation’s daily operation is governed by three major factors. These are basically governance, risk management, and compliance. Overtime, various strategies, resources, and ideas have been invested in evaluating the best way to initiate and manage these factors that are responsible for the growth of an organisation. We have seen organisations struggling to link strategies...",
      author: "Mitiget Learning Academy",
      img_src: "/assets/images/blogs/cyber.png"
    },
    {
      title: "Governance, Risk and Compliance",
      date: "January 23, 2023",
      body: "Every organisation’s daily operation is governed by three major factors. These are basically governance, risk management, and compliance. Overtime, various strategies, resources, and ideas have been invested in evaluating the best way to initiate and manage these factors that are responsible for the growth of an organisation. We have seen organisations struggling to link strategies...",
      author: "Mitiget Learning Academy",
      img_src: "/assets/images/blogs/cyber.png"
    }
  ];
}
