import { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
    rooms: [],
    loading: false,
    error: null,
};

export const RoomContext = createContext(INITIAL_STATE);

const RoomReducer = (state, action) => {
    switch (action.type) {
        case "GET_ROOMS_START":
            return {
                rooms: [],
                loading: true,
                error: null,
            };
        case "GETROOMS__SUCCESS":
            return {
                rooms: action.payload,
                loading: false,
                error: null,
            };
        case "GETROOMS__FAILURE":
            return {
                rooms: [],
                loading: false,
                error: action.payload,
            };
        case "CREATE_ROOM_START":
            return {
                ...state,
                loading: true,
                error: action.payload,
            };
        case "CREATE_ROOM_SUCCESS":
            return {
                rooms: [...state.rooms, action.payload],
                loading: false,
                error: false,
            };
        case "CREATE_ROOM_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const RoomContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(RoomReducer, INITIAL_STATE);
    // useEffect(() => {
    //     const getRooms = async () => {
    //         dispatch({ type: "GET_ROOMS_START" });
    //         try {
    //             const res = await axios.get("http://localhost:8809/api/rooms");
    //             dispatch({ type: "GET_ROOMS_SUCCESS", payload: res.data });
    //         } catch (err) {
    //             dispatch({ type: "GET_ROOMS_FAILURE" });
    //         }
    //     }
    //     getRooms();
    // }, []);

    return (
        <RoomContext.Provider value={{
            rooms: state.rooms,
            loading: state.loading,
            error: state.error,
            dispatch
        }}>
            {children}
        </RoomContext.Provider>
    )
}