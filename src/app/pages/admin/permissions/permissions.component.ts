import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CohortService } from 'src/app/services/cohort.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, fromEvent } from 'rxjs';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'app-permissions',
    standalone: true,
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.css'],
    imports: [CommonModule, EmptyContentComponent, ReactiveFormsModule, RedirectButtonComponent]
})
export class PermissionsComponent implements OnInit {

  all_permissions!: {id: number; name: string, admin_has: boolean}[];
  email: string;
  fetching: boolean = false;
  error: string = null
  permissionsGroup: FormGroup;
  submitted: boolean;
  search_input_stream: Observable<Event>;
  search_param: string;
  created: boolean;
  formError: string = null;
  @ViewChild('search_field', {static: false}) search_field: ElementRef;


  constructor(private adminService: AdminService, private route: ActivatedRoute, private fb: FormBuilder, private el: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {


    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email');
    });
    
    this.get_permissions(this.email);

    this.permissionsGroup = this.fb.group({
      permissions: this.fb.array([]),
    })

  }

  get_permissions(email: string) {
    this.fetching = true;
    this.adminService.getAllPermissions(email).subscribe({
      next: (response) => {
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.handleResponse(response);
      }
    });
  }

  handleResponse(response: {
    status: string;
    message?: string;
    permissions?: {
        id: number;
        name: string;
        admin_has: boolean
    }[];
}) {
    this.all_permissions = response.permissions;
    this.error = null;

    for (let privilege of this.all_permissions) {
    if (privilege.admin_has) this.permissions.push(this.fb.control(true));
    else this.permissions.push(this.fb.control(false));
    }

    this.changeDetector.detectChanges();


    this.search_input_stream  = fromEvent(this.search_field.nativeElement, 'input');

    this.search_input_stream.pipe(debounceTime(100)).subscribe((e)=>{
      this.search_param = (<HTMLInputElement>e.target).value;
    });


  }

  get permissions() {
    return <FormArray>this.permissionsGroup.get('permissions');
  }

  get location() {
    return `/admin/admin/${this.email}`;
  }



  check_match(permission: {name: string}) {
    if ((String(permission.name).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
      return false;
  }

  onSubmit(form: HTMLFormElement) {
    
    this.submitted = true;
    
    let formData = new FormData(form);
    this.adminService.updatePermissions(formData, this.email).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.created = true;
        // this.handleResponse(response)
      },
    });
    
  }
}
