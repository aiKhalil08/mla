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
    correct_answer_id?: number;
    text: string;
    points: number;
    type: {name: string};
    image_url?: string;
    options: Option[];
}

interface Option {
    id: number;
    text: string;
    is_correct?: boolean; // the is_correct property is only included when the question is being fetched by an admin
}

interface Response {
    question_id: number;
    option_id: number;
}

export {QuizItem, Quiz, QuizWithAssignments, Question, Response}