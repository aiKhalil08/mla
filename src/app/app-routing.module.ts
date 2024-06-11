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
import { studentNotLoggedInGuard } from './guards/student-not-logged-in.guard';
import { ContactForCourseComponent } from './pages/contact-for-course/contact-for-course.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { FAQSComponent } from './pages/faqs/faqs.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';
import { emailVerifiedGuard } from './guards/email-verified.guard';
import { SigninComponent } from './pages/authentication/signin/signin.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { ResetPasswordComponent } from './pages/authentication/reset-password/reset-password.component';
import { userIsStudentGuard } from './guards/user-is-student.guard';
import { userAuthGuard } from './guards/user-auth.guard';
import { userNotExternalGuard } from './guards/user-not-external.guard';
import { userIsAdminGuard } from './guards/user-is-admin.guard';
import { QuizLayoutComponent } from './pages/quiz/quiz-layout/quiz-layout.component';
import { userCanTakeQuizGuard } from './guards/user-can-take-quiz.guard';
import { TakeAssignmentComponent } from './pages/quiz/student/take-assignment/take-assignment.component';
import { ReviewAssignmentComponent } from './pages/quiz/student/review-assignment/review-assignment.component';


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
  {path: 'contact-for-course', component: ContactForCourseComponent, title: 'Contact Us', canActivate: [userIsStudentGuard]},
  {path: 'enroll', component: SignupComponent, title: 'Enroll', canActivate: [studentNotLoggedInGuard]},
  {path: 'verify-email', component: SignupComponent, title: 'Verify Email'},
  {path: 'login', component: SigninComponent, title: 'Login', canActivate: [studentNotLoggedInGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, title: 'Reset Password', canActivate: [studentNotLoggedInGuard]},
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
    canActivate: [userAuthGuard, userIsAdminGuard],
    loadChildren: () => import('./pages/admin/routes')
  },
  {
    path: 'home',
    component: StudentHomeComponent,
    title: 'Title',
    canActivate: [userAuthGuard, userNotExternalGuard, emailVerifiedGuard],
    loadChildren: () => import('./pages/student/routes')
  },
  {
    path: 'quiz/take/:name',
    component: TakeAssignmentComponent,
    title: 'Take Quiz | Quiz',
    canActivate: [userAuthGuard, userCanTakeQuizGuard],
  },
  {
    path: 'quiz/review/:name',
    component: ReviewAssignmentComponent,
    title: 'Review Quiz | Quiz',
    canActivate: [userAuthGuard, userCanTakeQuizGuard],
  },
  {
    path: 'quiz/admin',
    component: QuizLayoutComponent,
    title: 'Quiz Admin',
    canActivate: [userAuthGuard, userIsAdminGuard],
    loadChildren: () => import('./pages/quiz/admin/routes')
  },
  {
    path: 'quiz',
    component: QuizLayoutComponent,
    title: 'Quiz',
    canActivate: [userAuthGuard, userCanTakeQuizGuard],
    loadChildren: () => import('./pages/quiz/student/routes')
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
