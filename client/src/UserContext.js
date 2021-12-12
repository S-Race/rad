import React, { useContext, useReducer } from "react";

const UserContext = React.createContext();
export const useUserContext = () => useContext(UserContext);
import Reducer from "./userReducer";

export const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(Reducer.reducer, {});

    return (
        <UserContext.Provider value={{ user, dispatch, userActions: Reducer.ACTIONS }}>
            { children }
        </UserContext.Provider>
    );
};