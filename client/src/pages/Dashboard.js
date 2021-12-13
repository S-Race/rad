import React from "react";

import { useUserContext } from "../UserContext";
import Modal from "../components/Modal";
import DirectoryChooser from "../components/DirectoryChooser";

const Dashboard = () => {
    const { user } = useUserContext();

    return (
        <>
            <h1 className="text-black text-6xl">Dashboard</h1>
            <div>
                {user.username + " " + user.id}
            </div>
            <Modal open={true}>
                <DirectoryChooser/>
            </Modal>
        </>
    );
};

export default Dashboard;