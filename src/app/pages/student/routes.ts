import { Route } from "@angular/router";
import { AffiliateComponent } from "./affiliate/affiliate.component";
import { StudentDashboardComponent } from "./dashboard/dashboard.component";
import { StudentCartComponent } from "./student-cart/student-cart.component";
import { StudentCertificatesComponent } from "./student-certificates/student-certificates.component";
import { StudentCourseComponent } from "./student-course/student-course.component";
import { StudentCoursesComponent } from "./student-courses/student-courses.component";
import { StudentEventComponent } from "./student-event/student-event.component";
import { StudentEventsComponent } from "./student-events/student-events.component";
import { StudentHelpCenterComponent } from "./student-help-center/student-help-center.component";
import { StudentProfileComponent } from "./student-profile/student-profile.component";
import { WithdrawCommissionComponent } from "./withdraw-commission/withdraw-commission.component";

export default <Route[]> [
    {path: '', component: StudentDashboardComponent, title: 'Dashboard | Student'},
    {path: 'courses', component: StudentCoursesComponent, title: 'Courses | Student'},
    {path: 'course', component: StudentCourseComponent, title: 'Course | Student'},
    {path: 'events', component: StudentEventsComponent, title: 'Events | Student'},
    {path: 'event', component: StudentEventComponent, title: 'Event | Student'},
    {path: 'cart', component: StudentCartComponent, title: 'Cart | Student'},
    {path: 'certificates', component: StudentCertificatesComponent, title: 'Certificates | Student'},
    {path: 'profile', component: StudentProfileComponent, title: 'Profile | Student'},
    {path: 'help-center', component: StudentHelpCenterComponent, title: 'Help Center | Student'},
    {path: 'affiliate', component: AffiliateComponent, title: 'Affiliate'},
    {path: 'withdraw-commission', component: WithdrawCommissionComponent, title: 'Withdraw Comission'},
]