import React from "react";

import { useUserContext } from "../UserContext";

const Dashboard = () => {
    const { user } = useUserContext();

    return (
        <>
            <h1 className="text-black text-6xl">Dashboard</h1>
            <div>
                {user.username + " " + user.id}
            </div>
        </>
    );
};

export default Dashboard;