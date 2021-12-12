import React  from "react";
import { Outlet } from "react-router";
import Login from "../pages/Login";

import { useUserContext } from "../UserContext";

const ProtectedRoutes = () => {
    const { user } = useUserContext();

    return user?.username ? <Outlet/> : <Login/>;
};

export default ProtectedRoutes;