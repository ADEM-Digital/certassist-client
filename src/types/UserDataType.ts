export type UserDataType = {
    _id?: string;
    userId: string;
    usedQuestions: string[],
    markedQuestions: string[],
    correctQuestions: string[],
    incorrectQuestions: string[]
    dashboardTutorial?: boolean
    testsTutorial?: boolean
}