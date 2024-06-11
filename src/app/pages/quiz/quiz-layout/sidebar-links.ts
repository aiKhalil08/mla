import { SidebarItem } from "src/app/interfaces/sidebar_item";

const AdminSidebarItems: SidebarItem[] = [
    {text: 'Dashboard', location: '/admin', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'Quizzes', location: '/quiz/admin/quizzes', image: './assets/images/quizzes.png'},
    {text: 'Assignments', location: '/quiz/admin/assignments', image: './assets/images/assignments.png'},
    {text: 'Create Quiz', location: '/quiz/admin/create-quiz', image: './assets/images/add_quiz.png'},
    {text: 'Add Assignment', location: '/quiz/admin/add-assignment', image: './assets/images/add_assignment.png'},
];

const StudentSidebarItems: SidebarItem[] = [
    {text: 'Dashboard', location: '/home', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'My Assignments', location: '/quiz/all', image: './assets/images/assignment.png'},
    {text: 'History', location: '/quiz/history', image: './assets/svgs/history.svg'},
];


export {AdminSidebarItems, StudentSidebarItems}