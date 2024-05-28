import { Route } from "@angular/router";
import { QuizDashboardComponent } from "./quiz-dashboard/quiz-dashboard.component";

export default <Route[]> [
    {path: '', component: QuizDashboardComponent, title: 'Dashboard | Quiz' },
]