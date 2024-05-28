interface QuizItem {
    title: string;
    date_created: string;
}

interface Quiz extends QuizItem {
    description: string;
    questions_count: number;
    assignments_count: number;
    points_sum: string;
}

interface QuizWithAssignments extends QuizItem {
    description: string;
    assignments: {name: string}[];
};

interface Question {
    id: string;
    text: string;
    points: number;
    type: {name: string};
    image_url?: string;
    options: Option[];
}

interface Option {
    text: string;
    is_correct: boolean;
}

export {QuizItem, Quiz, QuizWithAssignments, Question}