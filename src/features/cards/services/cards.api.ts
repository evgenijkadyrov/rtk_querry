import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseURL} from "common/api/common.api";
import {
    AddCardResponseType,
    ArgCreateCardType,
    ArgGetCardsType, ArgUpdateCardType,
    DeleteCardResponseType,
    FetchCardsResponseType, UpdateCardResponseType
} from "features/cards/services/cards.api.types";


export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    //кол-вo повторных зааапросов при ошибке
    // baseQuery: retry(fetchBaseQuery({ baseUrl: baseURL, credentials:'include' }),{maxRetries:3}),

    baseQuery: fetchBaseQuery({baseUrl: baseURL, credentials: 'include'}),
    tagTypes: ['Cards'],
    //keepUnusedDataFor:5,
    // refetchOnFocus:true,
    endpoints: (builder) => ({
        getCards: builder.query<FetchCardsResponseType, ArgGetCardsType>({
            query: ({packId, page, pageCount}) => {
                return {
                    method: 'Get',
                    url: "cards/card",
                    params: {
                        cardsPack_id: packId,
                        page,
                        pageCount
                    }
                }
            },
            providesTags: (result) =>
                result
                    ? [...result.cards.map((card) => ({ type: "Cards" as const, id: card._id })), "Cards"]
                    : ["Cards"],
        }),
        addCards: builder.mutation<AddCardResponseType, ArgCreateCardType>({
            query(card) {
                return {
                    method: "POST",
                    url: "cards/card",
                    body: {
                        card
                    }
                }
            },
            invalidatesTags: ['Cards']
        }),
        deleteCard: builder.mutation<DeleteCardResponseType, string>({

            query(id) {

                return {
                    method: "DELETE",
                    url: "cards/card",
                    params: {
                        id
                    }

                }
            },
            invalidatesTags: ["Cards"]
        }),
        updateCard: builder.mutation<UpdateCardResponseType,ArgUpdateCardType>({
            query(card) {
                return{
                    method:"PUT",
                    url: "cards/card",
                    body:{
                        card
                    }
                }
            },
            invalidatesTags:(result, error, arg, meta)=>[{type:'Cards', id:arg._id}]
        })
    }),
})

export const {useGetCardsQuery, useAddCardsMutation, useDeleteCardMutation, useUpdateCardMutation} = cardsApi