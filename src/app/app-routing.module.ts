import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AddCourseComponent } from './pages/admin/add-course/add-course.component';
import { AddEventComponent } from './pages/admin/add-event/add-event.component';
import { AddResourceComponent } from './pages/admin/add-resource/add-resource.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ConnectWithUsComponent } from './pages/connect-with-us/connect-with-us.component';
import { CourseCatalogueComponent } from './pages/course-catalogue/course-catalogue.component';
import { CourseComponent } from './pages/course/course.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'MLA | Home'},
  {path: 'course/:course_code', component: CourseComponent, title: 'Course'},
  {path: 'blogs', component: BlogsComponent, title: 'Blogs'},
  {path: 'blog', component: BlogComponent, title: 'Blog'},
  {path: 'connect-with-us', component: ConnectWithUsComponent, title: 'Connect With Us'},
  {path: 'about-us', component: AboutUsComponent, title: 'About Us'},
  {path: 'course-catalogue', component: CourseCatalogueComponent, title: 'Course Catalogue'},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    title: 'Admin',
    children: [
      {path: '', component: DashboardComponent, title: 'Dashboard | Admin'},
      {path: 'add-course', component: AddCourseComponent, title: 'Add Course | Admin'},
      {path: 'add-event', component: AddEventComponent, title: 'Add Event | Admin'},
      {path: 'add-resource', component: AddResourceComponent, title: 'Add Resource | Admin'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
