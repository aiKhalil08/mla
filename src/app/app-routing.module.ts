import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AddEventComponent } from './pages/admin/add-event/add-event.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ConnectWithUsComponent } from './pages/connect-with-us/connect-with-us.component';
import { CourseCatalogueComponent } from './pages/course-catalogue/course-catalogue.component';
import { HomeComponent } from './pages/home/home.component';
import { AddCertificateCourseComponent } from './pages/admin/add-certificate-course/add-certificate-course.component';
import { AddCertificationCourseComponent } from './pages/admin/add-certification-course/add-certification-course.component';
import { AddOffshoreCourseComponent } from './pages/admin/add-offshore-course/add-offshore-course.component';
import { CertificateCourseComponent } from './pages/certificate-course/certificate-course.component';
import { OffshoreCourseComponent } from './pages/offshore-course/offshore-course.component';
import { CertificationCourseComponent } from './pages/certification-course/certification-course.component';
import { CoursesComponent } from './pages/admin/courses/courses.component';
import { EventsComponent as AdminEventsComponent } from './pages/admin/events/events.component';
import { ResourcesComponent } from './pages/admin/resources/resources.component';
import { ActionCertificateCourseComponent } from './pages/admin/action-certificate-course/action-certificate-course.component';
import { ActionCertificationCourseComponent } from './pages/admin/action-certification-course/action-certification-course.component';
import { ActionOffshoreCourseComponent } from './pages/admin/action-offshore-course/action-offshore-course.component';
import { CertificateCourseListComponent } from './partials/certificate-course-list/certificate-course-list.component';
import { CertificationCourseListComponent } from './partials/certification-course-list/certification-course-list.component';
import { OffshoreCourseListComponent } from './partials/offshore-course-list/offshore-course-list.component';
import { AddBlogComponent } from './pages/admin/add-blog/add-blog.component';
import { AddTestimonialComponent } from './pages/admin/add-testimonial/add-testimonial.component';
import { ActionBlogComponent } from './pages/admin/action-blog/action-blog.component';
import { ActionEventComponent } from './pages/admin/action-event/action-event.component';
import { EventComponent } from './pages/event/event.component';
import { ActionTestimonialComponent } from './pages/admin/action-testimonial/action-testimonial.component';
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { RequestComponent } from './pages/admin/request/request.component';
import { EventsComponent } from './pages/events/events.component';
import { StudentSignupComponent } from './pages/signup/student-signup/student-signup.component';
import { StudentLoginComponent } from './pages/login/student-login/student-login.component';
import { StudentLayoutComponent } from './pages/student/student-layout/student-layout.component';
import { StudentDashboardComponent } from './pages/student/dashboard/dashboard.component';
import { studentAuthGuard } from './guards/student-auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';
import { studentEmailVerifiedGuard } from './guards/student-email-verified.guard';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { StudentCoursesComponent } from './pages/student/student-courses/student-courses.component';
import { StudentCourseComponent } from './pages/student/student-course/student-course.component';
import { studentNotLoggedInGuard } from './guards/student-not-logged-in.guard';
import { adminNotLoggedInGuard } from './guards/admin-not-logged-in.guard';
import { StudentProfileComponent } from './pages/student/student-profile/student-profile.component';
import { StudentHelpCenterComponent } from './pages/student/student-help-center/student-help-center.component';
import { StudentEventsComponent } from './pages/student/student-events/student-events.component';
import { StudentEventComponent } from './pages/student/student-event/student-event.component';
import { SalesComponent } from './pages/admin/sales/sales.component';
import { AddSaleComponent } from './pages/admin/add-sale/add-sale.component';
import { AffiliateComponent } from './pages/student/affiliate/affiliate.component';
import { ContactForCourseComponent } from './pages/contact-for-course/contact-for-course.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { FAQSComponent } from './pages/faqs/faqs.component';
import { SaleComponent } from './pages/admin/sale/sale.component';
import { FulfillmentsComponent } from './pages/admin/fulfillments/fulfillments.component';
import { FulfillmentComponent } from './pages/admin/fulfillment/fulfillment.component';
import { WithdrawCommissionComponent } from './pages/student/withdraw-commission/withdraw-commission.component';


const routes: Routes = [
  {path: '', component: HomeComponent, title: 'MLA | Home'},
  {path: 'certificate-course/:course_code', component: CertificateCourseComponent, title: 'Certificate Course'},
  {path: 'certification-course/:course_code', component: CertificationCourseComponent, title: 'Certification Course'},
  {path: 'offshore-course/:course_title', component: OffshoreCourseComponent, title: 'Offshore Course'},
  {path: 'blogs', component: BlogsComponent, title: 'Blogs'},
  {path: 'blog/:heading', component: BlogComponent, title: 'Blog'},
  {path: 'events', component: EventsComponent, title: 'Events'},
  {path: 'event/:name', component: EventComponent, title: 'Event'},
  {path: 'connect-with-us', component: ConnectWithUsComponent, title: 'Connect With Us'},
  {path: 'about-us', component: AboutUsComponent, title: 'About Us'},
  {path: 'contact-for-course', component: ContactForCourseComponent, title: 'Contact Us', canActivate: [studentAuthGuard, studentEmailVerifiedGuard]},
  {path: 'enroll', component: StudentSignupComponent, title: 'Enroll', canActivate: [studentNotLoggedInGuard]},
  {path: 'verify-email', component: StudentSignupComponent, title: 'Verify Email'},
  {path: 'login', component: StudentLoginComponent, title: 'Login | Student', canActivate: [studentNotLoggedInGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, title: 'Reset Password', canActivate: [studentNotLoggedInGuard]},
  {path: 'login/admin', component: AdminLoginComponent, title: 'Login | Admin', canActivate: [adminNotLoggedInGuard]},
  {path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Privacy Policy'},
  {path: 'terms-and-conditions', component: TermsAndConditionComponent, title: 'Terms & Condition'},
  {path: 'frequently-asked-questions', component: FAQSComponent, title: 'FAQs'},
  {
    path: 'course-catalogue',
    component: CourseCatalogueComponent,
    title: 'Course Catalogue',
    children: [
      {path: '', component: CertificateCourseListComponent, title: 'Certificate Courses | Courses'},
      {path: 'certificate-courses', component: CertificateCourseListComponent, title: 'Certificate Courses | Courses'},
      {path: 'certification-courses', component: CertificationCourseListComponent, title: 'Certification Courses | Courses'},
      {path: 'offshore-courses', component: OffshoreCourseListComponent, title: 'Offshore Courses | Courses'},
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    title: 'Admin',
    canActivate: [adminAuthGuard],
    children: [
      {path: '', component: DashboardComponent, title: 'Dashboard | Admin'},
      {path: 'courses', component: CoursesComponent, title: 'Courses | Admin'},
      {path: 'events', component: AdminEventsComponent, title: 'Events | Admin'},
      {path: 'resources', component: ResourcesComponent, title: 'Resources | Admin'},
      {path: 'add-certificate-course', component: AddCertificateCourseComponent, title: 'Add Certificate Course | Admin'},
      {path: 'add-certification-course', component: AddCertificationCourseComponent, title: 'Add Certification Course | Admin'},
      {path: 'add-offshore-course', component: AddOffshoreCourseComponent, title: 'Add Offshore Course | Admin'},
      {path: 'add-event', component: AddEventComponent, title: 'Add Event | Admin'},
      {path: 'add-blog', component: AddBlogComponent, title: 'Add Blog | Admin'},
      {path: 'add-testimonial', component: AddTestimonialComponent, title: 'Add Testimonial | Admin'},
      {path: 'add-sale', component: AddSaleComponent, title: 'Add Sale | Admin'},
      {path: 'certificate-course/:course_code', component: ActionCertificateCourseComponent, title: 'Action Certificate Course | Admin'},
      {path: 'certification-course/:course_code', component: ActionCertificationCourseComponent, title: 'Action Certification Course | Admin'},
      {path: 'offshore-course/:course_title', component: ActionOffshoreCourseComponent, title: 'Action Offshore Course | Admin'},
      {path: 'blog/:heading', component: ActionBlogComponent, title: 'Action Blog | Admin'},
      {path: 'testimonial/:name', component: ActionTestimonialComponent, title: 'Action Testimonial | Admin'},
      {path: 'event/:name', component: ActionEventComponent, title: 'Action Event | Admin'},
      {path: 'requests', component: RequestsComponent, title: 'Requests | Admin'},
      {path: 'request/:last_name/:created_at', component: RequestComponent, title: 'Request | Admin'},
      {path: 'sales', component: SalesComponent, title: 'Sales | Admin'},
      {path: 'sale/:id', component: SaleComponent, title: 'Sale | Admin'},
      {path: 'fulfillments', component: FulfillmentsComponent, title: 'Fulfillments | Admin'},
      {path: 'fulfillment/:id', component: FulfillmentComponent, title: 'Fulfillment | Admin'},
    ]
  },
  {
    path: 'home',
    component: StudentLayoutComponent,
    title: 'Title',
    canActivate: [studentAuthGuard, studentEmailVerifiedGuard],
    children: [
      {path: '', component: StudentDashboardComponent, title: 'Dashboard | Student'},
      {path: 'courses', component: StudentCoursesComponent, title: 'Courses | Student'},
      {path: 'course', component: StudentCourseComponent, title: 'Course | Student'},
      {path: 'events', component: StudentEventsComponent, title: 'Events | Student'},
      {path: 'event', component: StudentEventComponent, title: 'Event | Student'},
      {path: 'profile', component: StudentProfileComponent, title: 'Profile | Student'},
      {path: 'help-center', component: StudentHelpCenterComponent, title: 'Help Center | Student'},
      {path: 'affiliate', component: AffiliateComponent, title: 'Affiliate'},
      {path: 'withdraw-commission', component: WithdrawCommissionComponent, title: 'Withdraw Comission'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
