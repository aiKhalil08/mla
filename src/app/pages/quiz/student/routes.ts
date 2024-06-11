import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { AssignmentsHistoryComponent } from "./assignments-history/assignments-history.component";
import { ReviewAssignmentComponent } from "./review-assignment/review-assignment.component";

export default <Route[]> [
    {path: '', component: DashboardComponent, title: 'Quiz'},
    {path: 'all', component: AssignmentsComponent, title: 'All Quizzes | Quiz' },
    {path: 'history', component: AssignmentsHistoryComponent, title: 'All Quizzes | Quiz' },
    {path: 'review/:name', component: ReviewAssignmentComponent, title: 'Review | Quiz' },
    {path: ':name', component: AssignmentComponent, title: 'Quiz | Quiz' },
]