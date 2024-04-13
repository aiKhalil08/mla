import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ConnectWithUsComponent } from './pages/connect-with-us/connect-with-us.component';
import { CourseCatalogueComponent } from './pages/course-catalogue/course-catalogue.component';
import { HomeComponent } from './pages/home/home.component';
import { CertificateCourseComponent } from './pages/certificate-course/certificate-course.component';
import { OffshoreCourseComponent } from './pages/offshore-course/offshore-course.component';
import { CertificationCourseComponent } from './pages/certification-course/certification-course.component';
import { CertificateCourseListComponent } from './partials/certificate-course-list/certificate-course-list.component';
import { CertificationCourseListComponent } from './partials/certification-course-list/certification-course-list.component';
import { OffshoreCourseListComponent } from './partials/offshore-course-list/offshore-course-list.component';
import { EventComponent } from './pages/event/event.component';
import { EventsComponent } from './pages/events/events.component';
import { StudentSignupComponent } from './pages/signup/student-signup/student-signup.component';
import { StudentLoginComponent } from './pages/login/student-login/student-login.component';
import { studentAuthGuard } from './guards/student-auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';
import { studentEmailVerifiedGuard } from './guards/student-email-verified.guard';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { studentNotLoggedInGuard } from './guards/student-not-logged-in.guard';
import { adminNotLoggedInGuard } from './guards/admin-not-logged-in.guard';
import { ContactForCourseComponent } from './pages/contact-for-course/contact-for-course.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { FAQSComponent } from './pages/faqs/faqs.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';


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
    component: AdminHomeComponent,
    title: 'Admin',
    canActivate: [adminAuthGuard],
    loadChildren: () => import('./pages/admin/routes')
  },
  {
    path: 'home',
    component: StudentHomeComponent,
    title: 'Title',
    canActivate: [studentAuthGuard, studentEmailVerifiedGuard],
    loadChildren: () => import('./pages/student/routes')
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
