import React  from "react";
import { Outlet } from "react-router";
import Dashboard from "../pages/Dashboard";

import { useUserContext } from "../UserContext";

const UnProtectedRoutes = () => {
    const { user } = useUserContext();

    return user?.username ? <Dashboard/> : <Outlet/>;
};

export default UnProtectedRoutes;