import { Question } from "./quiz";

export interface AssignmentItem {
    name: string;
    quiz: {title: string};
}

export interface Assignment extends AssignmentItem {
    description: string;
    status: {name: string};
    assignees_count: string;
    duration: number;
    shuffle: {questions: string; options: string};
    students_count: number;
    students_that_have_done_count: number;
    start_date?: string;
    end_date?: string;
    questions_count?: number;
    points_sum?: number;
}

export interface AssignedStudent {
    first_name: string;
    last_name: string;
    email: string,
    company: {name: string},
    id: number,
    is_assigned: boolean
};

export interface AttemptSummary {
    points_obtained: number;
    points_obtainable: number;
    time_taken: string;
    correct_answers: number;
}

export interface Session {
    duration: number;
    questions: Question[];
    shuffle: {questions: 'true' | 'false', options: 'true' | 'false'}
}

export interface HistoryItem extends AssignmentItem {end_date: string, score: {obtainable: number, obtained: number}}