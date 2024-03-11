import { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
    hotels: [],
    loading: false,
    error: null,
};

export const HotelContext = createContext(INITIAL_STATE);

const HotelReducer = (state, action) => {
    switch (action.type) {
        case "GET_HOTELS_START":
            return {
                hotels: [],
                loading: true,
                error: null,
            };
        case "GET_HOTELS_SUCCESS":
            return {
                hotels: action.payload,
                loading: false,
                error: null,
            };
        case "GET_HOTELS_FAILURE":
            return {
                hotels: [],
                loading: false,
                error: action.payload,
            };
        case "CREATE_HOTEL_START":
            return {
                ...state,
                loading: true,
                error: action.payload,
            };
        case "CREATE_HOTEL_SUCCESS":
            return {
                hotels: [...state.hotels, action.payload],
                loading: false,
                error: false,
            };
        case "CREATE_HOTEL_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "UPDATE_HOTEL_START":
            return {
                ...state,
                loading: true,
                error: action.payload,
            };
        case "UPDATE_HOTEL_SUCCESS":
            return {
                hotels: state.hotels.map((hotel) => hotel._id === action.payload._id ? action.payload : hotel),
                loading: false,
                error: false,
            };
        case "UPDATE_HOTEL_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const HotelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(HotelReducer, INITIAL_STATE);
    useEffect(() => {
        const getHotels = async () => {
            dispatch({ type: "GET_HOTELS_START" });
            try {
                const res = await axios.get("http://localhost:8809/api/hotels");
                dispatch({ type: "GET_HOTELS_SUCCESS", payload: res.data });
            } catch (err) {
                dispatch({ type: "GET_HOTELS_FAILURE" });
            }
        }
        getHotels();
    }, []);

    return (
        <HotelContext.Provider value={{
            hotels: state.hotels,
            loading: state.loading,
            error: state.error,
            dispatch
        }}>
            {children}
        </HotelContext.Provider>
    )
}