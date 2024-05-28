import { Route } from "@angular/router";
import { ActionBlogComponent } from "./action-blog/action-blog.component";
import { ActionCertificateCourseComponent } from "./action-certificate-course/action-certificate-course.component";
import { ActionCertificationCourseComponent } from "./action-certification-course/action-certification-course.component";
import { ActionEventComponent } from "./action-event/action-event.component";
import { ActionOffshoreCourseComponent } from "./action-offshore-course/action-offshore-course.component";
import { ActionTestimonialComponent } from "./action-testimonial/action-testimonial.component";
import { AddBlogComponent } from "./add-blog/add-blog.component";
import { AddCertificateCourseComponent } from "./add-certificate-course/add-certificate-course.component";
import { AddCertificationCourseComponent } from "./add-certification-course/add-certification-course.component";
import { AddCohortComponent } from "./add-cohort/add-cohort.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { AddOffshoreCourseComponent } from "./add-offshore-course/add-offshore-course.component";
import { AddSaleComponent } from "./add-sale/add-sale.component";
import { AddTestimonialComponent } from "./add-testimonial/add-testimonial.component";
import { AffiliatesComponent } from "./affiliates/affiliates.component";
import { CertificatesComponent } from "./certificates/certificates.component";
import { CohortComponent } from "./cohort/cohort.component";
import { CohortsComponent } from "./cohorts/cohorts.component";
import { CoursesComponent } from "./courses/courses.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditCohortComponent } from "./edit-cohort/edit-cohort.component";
import { FulfillmentComponent } from "./fulfillment/fulfillment.component";
import { FulfillmentsComponent } from "./fulfillments/fulfillments.component";
import { NotifyStudentsComponent } from "./notify-students/notify-students.component";
import { PopulateCohortComponent } from "./populate-cohort/populate-cohort.component";
import { RequestComponent } from "./request/request.component";
import { RequestsComponent } from "./requests/requests.component";
import { ResourcesComponent } from "./resources/resources.component";
import { SaleComponent } from "./sale/sale.component";
import { SalesComponent } from "./sales/sales.component";
import { EventsComponent } from './events/events.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { AdminsComponent } from "./admins/admins.component";
import { AdminComponent } from "./admin/admin.component";
import { EditAdminComponent } from "./edit-admin/edit-admin.component";
import { AuditComponent } from "./audit/audit.component";
import { AuditTrailsComponent } from "./audit-trails/audit-trails.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./user/user.component";
import { EventRegistrantsComponent } from "./event-registrants/event-registrants.component";
import { EventRegistrationComponent } from "./event-registration/event-registration.component";
import { AddExternalUserComponent } from "./add-external-user/add-external-user.component";
import { ExternalUsersComponent } from "./external-users/external-users.component";
import { ExternalUserComponent } from "./external-user/external-user.component";
import { EditExternalUserComponent } from "./edit-external-user/edit-external-user.component";

export default <Route[]> [
    {path: '', component: DashboardComponent, title: 'Dashboard | Admin'},
    {path: 'courses', component: CoursesComponent, title: 'Courses | Admin'},
    {path: 'events', component: EventsComponent, title: 'Events | Admin'},
    {path: 'resources', component: ResourcesComponent, title: 'Resources | Admin'},
    {path: 'add-certificate-course', component: AddCertificateCourseComponent, title: 'Add Certificate Course | Admin'},
    {path: 'add-certification-course', component: AddCertificationCourseComponent, title: 'Add Certification Course | Admin'},
    {path: 'add-offshore-course', component: AddOffshoreCourseComponent, title: 'Add Offshore Course | Admin'},
    {path: 'add-event', component: AddEventComponent, title: 'Add Event | Admin'},
    {path: 'add-blog', component: AddBlogComponent, title: 'Add Blog | Admin'},
    {path: 'add-testimonial', component: AddTestimonialComponent, title: 'Add Testimonial | Admin'},
    {path: 'add-sale', component: AddSaleComponent, title: 'Add Sale | Admin'},
    {path: 'add-cohort', component: AddCohortComponent, title: 'Add Cohort | Admin'},
    {path: 'add-external-user', component: AddExternalUserComponent, title: 'Add External User | Admin'},
    {path: 'certificate-course/:course_code', component: ActionCertificateCourseComponent, title: 'Action Certificate Course | Admin'},
    {path: 'certification-course/:course_code', component: ActionCertificationCourseComponent, title: 'Action Certification Course | Admin'},
    {path: 'offshore-course/:course_title', component: ActionOffshoreCourseComponent, title: 'Action Offshore Course | Admin'},
    {path: 'blog/:heading', component: ActionBlogComponent, title: 'Action Blog | Admin'},
    {path: 'testimonial/:name', component: ActionTestimonialComponent, title: 'Action Testimonial | Admin'},
    {path: 'event/:name', component: ActionEventComponent, title: 'Action Event | Admin'},
    {path: 'event/:name/registrations', component: EventRegistrantsComponent, title: 'Event Registrants | Admin'},
    {path: 'event/registration/:id', component: EventRegistrationComponent, title: 'Registration | Admin'},
    {path: 'requests', component: RequestsComponent, title: 'Requests | Admin'},
    {path: 'request/:last_name/:created_at', component: RequestComponent, title: 'Request | Admin'},
    {path: 'sales', component: SalesComponent, title: 'Sales | Admin'},
    {path: 'sale/:id', component: SaleComponent, title: 'Sale | Admin'},
    {path: 'cohorts', component: CohortsComponent, title: 'Cohorts | Admin'},
    {path: 'cohort/populate', component: PopulateCohortComponent, title: 'Add Students | Admin'},
    {path: 'cohort/notify-students', component: NotifyStudentsComponent, title: 'Notify Students | Admin'},
    {path: 'cohort/edit', component: EditCohortComponent, title: 'Edit Cohort | Admin'},
    {path: 'cohort/:name', component: CohortComponent, title: 'Cohort | Admin'},
    {path: 'fulfillments', component: FulfillmentsComponent, title: 'Fulfillments | Admin'},
    {path: 'fulfillment/:id', component: FulfillmentComponent, title: 'Fulfillment | Admin'},
    {path: 'certificates', component: CertificatesComponent, title: 'Certificates | Admin'},
    {path: 'affiliates', component: AffiliatesComponent, title: 'Affiliates | Admin'},
    {path: 'affiliate/:email', component: AffiliateComponent, title: 'Affiliate | Admin'},
    {path: 'users', component: UsersComponent, title: 'Users | Admin'},
    {path: 'user/:email', component: UserComponent, title: 'User | Admin'},
    {path: 'audit-trail/:id', component: AuditComponent, title: 'Audit | Admin'},
    {path: 'audit-trails', component: AuditTrailsComponent, title: 'Audits | Admin'},
    {path: 'admins', component: AdminsComponent, title: 'Admins | Admin'},
    {path: ':email/permissions', component: PermissionsComponent, title: 'Permissions | Admin'},
    // {path: ':email/edit', component: EditAdminComponent, title: 'Edit Admin | Admin'},
    {path: 'admin/:email', component: AdminComponent, title: 'Admin | Admin'},
    {path: 'external-users', component: ExternalUsersComponent, title: 'External Users | Admin'},
    {path: 'external-user/:email', component: ExternalUserComponent, title: 'External User | Admin'},
    {path: 'external-user/:email/edit', component: EditExternalUserComponent, title: 'Edit External User | Admin'},
]