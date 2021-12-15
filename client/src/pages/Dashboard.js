import React from "react";

import Carousel from "../components/Carousel";

const Dashboard = () => {
    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen">
            <h1 className="text-6xl">Dashboard</h1>

            <Carousel title="Continue Listening"/>
            <Carousel title="Recommended"/>
        </div>
    );
};

export default Dashboard;