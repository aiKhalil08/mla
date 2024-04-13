import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CertificateService } from 'src/app/services/certificate.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { ViewCertificateComponent } from "../../../partials/view-certificate/view-certificate.component";

@Component({
    selector: 'app-student-certificates',
    standalone: true,
    templateUrl: './student-certificates.component.html',
    styleUrls: ['./student-certificates.component.css'],
    imports: [CommonModule, EmptyContentComponent, ViewCertificateComponent]
})
export class StudentCertificatesComponent implements OnInit {

  certificates: {name: string, url: string}[];

  no_certificates: string = null;

  fetching_certificates: boolean;

  show_certificate: boolean = false;
  certificate_url: string = null;

  modalClosed: boolean = false;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.fetch_certificates();
  }

  fetch_certificates() {
    this.fetching_certificates = true;
    this.certificateService.get_my_certificates().subscribe({
      next: response => {
        this.fetching_certificates = false;
        if (response.status == 'failed') {
          this.no_certificates = response.message;
          return;
        }
        this.handle_response(response);
      }
    });
  }

  handle_response(response: {
    status: string;
    message?: string;
    certificates: {
        name: string;
        url: string;
    }[];
  }) {
    this.no_certificates = null;
    this.certificates = response.certificates;
  }


  view(url: string) {
    this.modalClosed = false;
    this.show_certificate = true;
    this.certificate_url = url;
  }

  close_modal() {
    this.modalClosed = true;
    this.show_certificate = false;
    this.certificate_url = null;
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
}
