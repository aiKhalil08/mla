import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate.service';
// import { CertificatesComponent } from '../admin/certificates/certificates.component';

@Component({
  selector: 'app-view-certificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.css']
})
export class ViewCertificateComponent implements OnInit {
  // @Input() type: 'cohort_certificates' | 'individual_course_certificates';
  // @Input() cohort_name?: string;
  // @Input() course_type?: string;
  // @Input() course_identity?: string;
  // @Input() for: string;
  @Input() path: string;

  // @ViewChild('myParent', {static: true}) parent: CertificatesComponent;

  @Output() remove = new EventEmitter();

  fetching: boolean;
  error: string = null;
  certificate: {url: string};
  domain_name: string = 'http://localhost:8000';
  // domain_name: string = 'https://mlaapi.mitiget.com';

  // , @Inject('DOMAIN_NAME') private domain_name

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    // console.log(this.type, this.name, this.for)
    // console.log(this.url)
    // if (!this.path) this.fetch_certificate();
  }

  get url() {
    return `${this.domain_name}/storage/${this.path}`;
  }

  // fetch_certificate() {

  //   let options: { cohort_name?: string; student_email: string; course_type?: string; course_identity?: string; };

  //   if (this.type == 'cohort_certificates') {
  //     options = {
  //       cohort_name: this.cohort_name,
  //       student_email: this.for
  //     }
  //   } else if (this.type == 'individual_course_certificates') {
  //     options = {
  //       course_type: this.course_type,
  //       course_identity: this.course_identity,
  //       student_email: this.for,
  //     }
  //   } 

  //   this.fetching = true;
  //   // setTimeout(() => {
  //     this.certificateService.get(this.type, options).subscribe({
  //       next: response => {
  //         this.fetching = false;
  //         console.log(response);
  //         this.certificate = response.certificate;
  //       }
  //     });
      
  //   // }, 4000);
  // }

  remove_modal() {
    this.remove.emit();
  }

}
