import { Route } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
import { QuizzesComponent } from "./quizzes/quizzes.component";
import { QuizComponent } from "./quiz/quiz.component";
import { EditQuizComponent } from "./edit-quiz/edit-quiz.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { QuestionsComponent } from "./questions/questions.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
// import { UpdateAssignmentsComponent } from "./update-assignments/update-assignments.component";
import { NotifyComponent } from "./notify/notify.component";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";
import { EditAssignmentComponent } from "./edit-assignment/edit-assignment.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { PopulateAssignmentComponent } from "./populate-assignment/populate-assignment.component";

export default <Route[]> [
    {path: '', component: AdminDashboardComponent, title: 'Admin Dashboard | Quiz' },
    {path: 'create-quiz', component: CreateQuizComponent, title: 'Create Quiz | Quiz' },
    {path: 'edit-quiz', component: EditQuizComponent, title: 'Edit Quiz | Quiz' },
    {path: 'quizzes', component: QuizzesComponent, title: 'All Quizzes | Quiz' },
    {path: 'quiz/:title', component: QuizComponent, title: 'Quiz | Quiz' },
    {path: 'questions', component: QuestionsComponent, title: 'Questions | Quiz' },
    {path: 'add-question', component: AddQuestionComponent, title: 'Add Question | Quiz' },
    {path: 'edit-question', component: EditQuestionComponent, title: 'Edit Question | Quiz' },
    {path: 'assignments', component: AssignmentsComponent, title: 'Assignments | Quiz' },
    {path: 'assignment/:name', component: AssignmentComponent, title: 'Assignment | Quiz' },
    {path: 'add-assignment', component: AddAssignmentComponent, title: 'Add Assignment | Quiz' },
    {path: 'edit-assignment', component: EditAssignmentComponent, title: 'Edit Assignment | Quiz' },
    {path: 'populate-assignment', component: PopulateAssignmentComponent, title: 'Populate Assignments | Quiz' },
    {path: 'notify', component: NotifyComponent, title: 'Notify | Quiz' },
]