import { Route } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
import { QuizzesComponent } from "./quizzes/quizzes.component";
import { QuizComponent } from "./quiz/quiz.component";
import { EditQuizComponent } from "./edit-quiz/edit-quiz.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { QuestionsComponent } from "./questions/questions.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { UpdateAssignmentsComponent } from "./update-assignments/update-assignments.component";
import { NotifyComponent } from "./notify/notify.component";

export default <Route[]> [
    {path: '', component: AdminDashboardComponent, title: 'Admin Dashboard | Quiz' },
    {path: 'create-quiz', component: CreateQuizComponent, title: 'Create Quiz | Quiz' },
    {path: 'edit-quiz', component: EditQuizComponent, title: 'Edit Quiz | Quiz' },
    {path: 'quizzes', component: QuizzesComponent, title: 'All Quizzes | Quiz' },
    {path: 'quiz/:title', component: QuizComponent, title: 'Quiz | Quiz' },
    {path: 'questions', component: QuestionsComponent, title: 'Questions | Quiz' },
    {path: 'add-question', component: AddQuestionComponent, title: 'Add Question | Quiz' },
    {path: 'edit-question', component: EditQuestionComponent, title: 'Edit Question | Quiz' },
    {path: 'update-assignments', component: UpdateAssignmentsComponent, title: 'Update Assignments | Quiz' },
    {path: 'notify', component: NotifyComponent, title: 'Notify | Quiz' },
]