import { Component, Input } from '@angular/core';
import { FaqItemComponent } from "../faq-item/faq-item.component";
import { CommonModule } from '@angular/common';




@Component({
    selector: 'app-faq-list',
    standalone: true,
    templateUrl: './faq-list.component.html',
    styleUrls: ['./faq-list.component.css'],
    imports: [FaqItemComponent, CommonModule]
})
export class FaqListComponent {

  @Input() darker: boolean = false;

  faqs = [
    {
      question: 'How do I purchase a course?',
      answer: 'You can purchase a course by clicking on the "Contact Us" button in the page for each course, or the "Enroll" button for each course in your cart.',
    },
    {
      question: 'What is the delivery mode of courses?',
      answer: 'We offer three delivery modes: On-Site, Virtual.',
    },
    {
      question: 'Are there any prerequisites for enrolling in a course?',
      answer: 'The prerequisites for each course are specific and can be found in the page for each course.',
    },
    {
      question: 'How can I register for an event?',
      answer: 'You can register for an event by clicking on the "Register" button in the page for each event or on the page for each event in your watchlist.',
    },
    {
      question: 'How can I keep track of event and course?',
      answer: 'You can keep track of an event by adding it to your watchlist and a course by adding it to your cart',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'The primary mode of payment is bank transfer. You can contact us for more information.',
    },
    {
      question: 'Can I pay in installments for courses?',
      answer: 'Yes, you can pay in installments based on pre-negotiated terms.',
    },
    {
      question: 'How do I create an account on the website?',
      answer: 'Click the "Enroll" button at the top of the homepage',
    },
  ];

}
