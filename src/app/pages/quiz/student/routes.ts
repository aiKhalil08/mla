import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { QuizzesComponent } from "./quizzes/quizzes.component";

export default <Route[]> [
    {path: '', component: DashboardComponent, title: 'Quiz'},
    {path: 'all', component: QuizzesComponent, title: 'All Quizzes | Quiz' }
]