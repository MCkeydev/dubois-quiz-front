interface ObjectWithId {
    id: number;
}

export interface QuizQuestion extends ObjectWithId {
    isQcm: boolean;
    title: string;
    maxScore: number;
    answers: Answer[]; // Le type de ce tableau n'est pas précisé dans l'objet JSON
}

interface Answer extends ObjectWithId {
    title: string;
}

interface Question extends ObjectWithId {
    title: string;
    answers: Answer[];
}

interface Author {
    id: number;
    email: string;
}

interface Quiz {
    title: string;
    questions: Question[];
    author: Author;
}

export type StudentCopy = {
    commentary?: string;
    score?: number;
    position?: number;
};

export type Formation = {
    id: number;
    name: string;
};

export interface Evaluation extends ObjectWithId {
    createdAt: string;
    startsAt: string;
    endsAt: string;
    isLocked: boolean;
    copyCount?: number | undefined;
    quiz: Quiz;
    studentCopies: StudentCopy[];
    formation?: Formation;
}

export type EvaluationObject = {
    studentCopy?: StudentCopy;
    formation?: Formation;
    evaluation?: Evaluation;
};
