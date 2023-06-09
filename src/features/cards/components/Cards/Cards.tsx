import {useParams} from "react-router-dom"
import {
    useAddCardsMutation,
    useDeleteCardMutation,
    useGetCardsQuery, useUpdateCardMutation
} from "features/cards/services/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import {ArgCreateCardType, CardType} from "features/cards/services/cards.api.types";
import {nanoid} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import s from './styles.module.css'
import {ChangeEvent, useState} from "react";
import {Pagination} from "@mui/material";

export const Cards = () => {
    let {packId} = useParams<{ packId: string }>();
    const [page, setPage]=useState(1)
    const [pageCount, setPageCount]=useState(3)

    const {data, error, isLoading} = useGetCardsQuery({packId: packId ?? '', page,pageCount})
    const [addCard] = useAddCardsMutation()
    const [deleteCard]=useDeleteCardMutation()
    const [updateCard]=useUpdateCardMutation()
    if (isLoading) {
        return <LinearProgress color={"secondary"}/>

    }
    const addCardHandler = () => {
        if (packId) {
            const newCard: ArgCreateCardType = {
                cardsPack_id: packId,
                question: "🐱 question " + nanoid(),
                answer: "🐙 answer " + nanoid(),
            };
            addCard(newCard).unwrap()
                .then((res) => {

                    const cardQuestion = res.newCard.question;
                    toast.success(`Cards ${cardQuestion} added`)

                })
                .catch(err => toast.error(err.data.error))
        }
    }
    const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
       setPage(page)
    };
    const deleteCardHandler =(cardId:string)=>{
        deleteCard(cardId)
    }
    const updateCardHandler =(card:CardType)=>{
        const newCard = {...card, question:"newenwenwnewnenenwen", answer: "newnewenwnenwenwenwen"}
       updateCard(newCard)
    }
    return (
        <div>
            <h1>Cards</h1>
            <button onClick={addCardHandler}>add cards</button>
            <div>
                {data &&
                    data.cards.map((card) => {
                        return (
                            <div className={s.container} key={card._id}>
                                <div>
                                    <b>Question: </b>
                                    <p>{card.question}</p>{" "}
                                </div>
                                <div>
                                    <b>Answer: </b>
                                    <p>{card.answer}</p>{" "}
                                </div>
                                <button onClick={()=>deleteCardHandler(card._id)}>delete card</button>
                                <button onClick={()=>updateCardHandler(card)}>update card</button>
                            </div>
                        );
                    })}
            </div>
            <Pagination count={data && data.cardsTotalCount} onChange={changePageHandler} />
        </div>
    );
}
