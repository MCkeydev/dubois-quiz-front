import { UserType } from '../types/interfaces';

interface ObjectWithId {
    id: number;
}

export interface QuizQuestion extends ObjectWithId {
    isQcm: boolean;
    title: string;
    maxScore: number;
    answers: Answer[];
}

interface Answer extends ObjectWithId {
    title: string;
}

export interface StudentAnswer extends ObjectWithId {
    annotation: string;
    score: number;
    question: Question;
    answer?: string; // cette propriété est facultative car elle peut être nulle dans votre exemple
    choice?: {
        id: number;
        title: string;
    };
}

interface Question extends ObjectWithId {
    title: string;
    maxScore: number;
    answers: Answer[];
}

interface Author {
    id: number;
    email: string;
}

export interface Quiz extends ObjectWithId {
    title: string;
    maxScore: number;
    questions: Question[];
    author?: Author;
}

export interface StudentCopy extends ObjectWithId {
    createdAt: string;
    commentary?: string;
    score?: number;
    position?: number;
    student: UserType;
    evaluation: Evaluation;
    studentAnswers: Array<StudentAnswer>;
}

export type Formation = {
    id: number;
    name: string;
};

export interface Evaluation extends ObjectWithId {
    averageScore?: string;
    maxScore?: string;
    createdAt: string;
    startsAt: string;
    endsAt: string;
    isLocked: boolean;
    copyCount: number | undefined;
    quiz: Quiz;
    studentCopies: StudentCopy[];
    formation?: Formation;
}

export type EvaluationObject = {
    studentCopy?: StudentCopy;
    formation?: Formation;
    evaluation?: Evaluation;
};
