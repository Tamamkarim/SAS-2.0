import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import { HotelContextProvider } from "context/HotelContext";
import { RoomContextProvider } from "context/RoomContext";
import "index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <HotelContextProvider>
          <RoomContextProvider>
            <App />
          </RoomContextProvider>
        </HotelContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
