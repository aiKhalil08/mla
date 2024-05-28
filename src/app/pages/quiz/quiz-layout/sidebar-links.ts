import { SidebarItem } from "src/app/interfaces/sidebar_item";

const AdminSidebarItems: SidebarItem[] = [
    {text: 'Dashboard', location: '/admin', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'All Quizzes', location: '/quiz/admin/quizzes', image: './assets/svgs/events_icon.svg', permission: 'events'},
    {text: 'Create Quiz', location: '/quiz/admin/create-quiz', image: './assets/svgs/courses_icon.svg', permission: 'courses'},
];

const StudentSidebarItems: SidebarItem[] = [
    {text: 'Dashboard', location: '/quiz', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'My Quizzes', location: '/quiz/all', image: './assets/svgs/events_icon.svg', permission: 'events'},
    {text: 'History', location: '/quiz/history', image: './assets/svgs/courses_icon.svg', permission: 'courses'},
];


export {AdminSidebarItems, StudentSidebarItems}