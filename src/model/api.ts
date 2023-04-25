export type QuizQuestion = {
    id: number;
    isQcm: boolean;
    title: string;
    maxScore: number;
    answers: any[]; // Le type de ce tableau n'est pas précisé dans l'objet JSON
};

export type Quiz = {
    id: number;
    title: string;
    questions: QuizQuestion[];
};

export type StudentCopy = {
    commentary?: string;
    score?: number;
    position?: number;
};

export type Formation = {
    id: number;
    name: string;
};

export type Evaluation = {
    quiz: Quiz;
    averageScore: number;
    maxScore: number;
    copyCount: number;
    startsAt: string;
    endsAt: string;
    formation?: Formation;
};

export type EvaluationObject = {
    studentCopy?: StudentCopy;
    formation?: Formation;
    evaluation?: Evaluation;
};
