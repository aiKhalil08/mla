export interface AdminDashboard {
    'certificate-courses_count': number;
    'certification-courses_count': number;
    'offshore-courses_count': number;
    'events_count': number;
    'blogs_count': number;
    'testimonials_count': number;
    'requests_count': {
      'all': number;
      'unread': number;
    };
    'students': number;
    'affiliates': number;
    'tutors': number;
  }