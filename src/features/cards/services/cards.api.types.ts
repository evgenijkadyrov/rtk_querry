export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: CardGradeType;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    answerImg?: string;
    answerVideo?: string;
    questionImg?: string;
    questionVideo?: string;
};;

export type FetchCardsResponseType = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
};
type CardGradeType = 0 | 1 | 2 | 3 | 4 | 5;

export type ArgCreateUpdateCardType = {
    _id: string;
    cardsPack_id: string;
    question?: string;
    answer?: string;
    grade?: CardGradeType;
    shots?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
};
export type ArgCreateCardType= Omit<ArgCreateUpdateCardType, '_id'>
export type ArgUpdateCardType = Omit<ArgCreateUpdateCardType, 'cardsPack_id'>


export type ArgGetCardsType = {
    packId: string;
    page?: number;
    pageCount?: number;
};
type DelAddUpdCardResponseType={
    newCard: CardType;
    deletedCard: CardType;
    token: string;
    tokenDeathTime: number;
    updateCard: CardType;
}
export type DeleteCardResponseType = Omit<DelAddUpdCardResponseType, 'updateCard'|'newCard'>
export type AddCardResponseType = Omit<DelAddUpdCardResponseType, 'updateCard'|'deleteCard'>
export type UpdateCardResponseType = Omit<DelAddUpdCardResponseType, 'deletedCard'|'newCard'>
