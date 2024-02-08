import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AddEventComponent } from './pages/admin/add-event/add-event.component';
import { AddResourceComponent } from './pages/admin/add-resource/add-resource.component';
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
import { EventsComponent } from './pages/admin/events/events.component';
import { ResourcesComponent } from './pages/admin/resources/resources.component';
import { ActionCertificateCourseComponent } from './pages/admin/action-certificate-course/action-certificate-course.component';
import { ActionCertificationCourseComponent } from './pages/admin/action-certification-course/action-certification-course.component';
import { ActionOffshoreCourseComponent } from './pages/admin/action-offshore-course/action-offshore-course.component';
import { CertificateCourseListComponent } from './partials/certificate-course-list/certificate-course-list.component';
import { CertificationCourseListComponent } from './partials/certification-course-list/certification-course-list.component';
import { OffshoreCourseListComponent } from './partials/offshore-course-list/offshore-course-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'MLA | Home'},
  {path: 'certificate-course/:course_code', component: CertificateCourseComponent, title: 'Certificate Course'},
  {path: 'certification-course/:course_code', component: CertificationCourseComponent, title: 'Certification Course'},
  {path: 'offshore-course/:course_title', component: OffshoreCourseComponent, title: 'Offshore Course'},
  {path: 'blogs', component: BlogsComponent, title: 'Blogs'},
  {path: 'blog', component: BlogComponent, title: 'Blog'},
  {path: 'connect-with-us', component: ConnectWithUsComponent, title: 'Connect With Us'},
  {path: 'about-us', component: AboutUsComponent, title: 'About Us'},
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
    children: [
      {path: '', component: DashboardComponent, title: 'Dashboard | Admin'},
      {path: 'courses', component: CoursesComponent, title: 'Courses | Admin'},
      {path: 'events', component: EventsComponent, title: 'Events | Admin'},
      {path: 'resources', component: ResourcesComponent, title: 'Resources | Admin'},
      {path: 'add-certificate-course', component: AddCertificateCourseComponent, title: 'Add Certificate Course | Admin'},
      {path: 'add-certification-course', component: AddCertificationCourseComponent, title: 'Add Certification Course | Admin'},
      {path: 'add-offshore-course', component: AddOffshoreCourseComponent, title: 'Add Offshore Course | Admin'},
      {path: 'add-event', component: AddEventComponent, title: 'Add Event | Admin'},
      {path: 'add-resource', component: AddResourceComponent, title: 'Add Resource | Admin'},
      {path: 'certificate-course/:course_code', component: ActionCertificateCourseComponent, title: 'Action Certificate Course | Admin'},
      {path: 'certification-course/:course_code', component: ActionCertificationCourseComponent, title: 'Action Certification Course | Admin'},
      {path: 'offshore-course/:course_title', component: ActionOffshoreCourseComponent, title: 'Action Offshore Course | Admin'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
