import { SidebarItem } from "src/app/interfaces/sidebar_item";

export const SidebarItems: SidebarItem[] = [
    {text: 'Dashboard', location: '/admin', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'Courses', location: '/admin/courses', image: './assets/svgs/courses_icon.svg', permission: 'courses'},
    {text: 'Events', location: '/admin/events', image: './assets/svgs/events_icon.svg', permission: 'events'},
    {text: 'Resources', location: '/admin/resources', image: './assets/svgs/resources_icon.svg', permission: 'resources'},
    {text: 'Requests', location: '/admin/requests', image: './assets/svgs/request.svg', permission: 'requests'},
    {text: 'Users', location: '/admin/users', image: './assets/svgs/users_icon.svg', permission: 'students'},
    {text: 'External Users', location: '/admin/external-users', image: './assets/svgs/external-user.svg', permission: 'students'},
    {text: 'Quiz', location: '/quiz/admin', image: './assets/images/quiz.png', permission: 'quiz'},
    {text: 'Cohorts', location: '/admin/cohorts', image: './assets/svgs/cohort.svg', permission: 'cohorts'},
    {text: 'Certificates', location: '/admin/certificates', image: './assets/images/certificate.png', permission: 'certificates'},
    {text: 'Sales', location: '/admin/sales', image: './assets/svgs/sales.svg', permission: 'sales'},
    {text: 'Affiliates', location: '/admin/affiliates', image: './assets/svgs/affiliates_icon.svg', permission: 'affiliates'},
    {text: 'Admins', location: '/admin/admins', image: './assets/images/admin.png', permission: 'admins'},
    {text: 'Fulfillments', location: '/admin/fulfillments', image: './assets/svgs/fulfillment.svg', permission: 'fulfillments'},
    {text: 'Audit', location: '/admin/audit-trails', image: './assets/images/audit-trail.png', permission: 'fulfillments'},
  ];