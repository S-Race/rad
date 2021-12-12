import React from "react";
import { Link } from "react-router-dom";

import { useUserContext } from "../UserContext";

const NavBar = () => {
    const { user } = useUserContext();

    return (
        user.username ?
            <nav className="bg-gray-900 p-5 flex justify-end">
                <input type="text" placeholder="Search" />
            </nav>
            :
            <nav className="bg-gray-900 p-5 flex justify-end">
                <Link to="/login" className="text-gray-100 font-medium text-xl mx-4">Login</Link>
                <Link to="/signup" className="text-gray-100 font-medium text-xl mx-4">Sign up</Link>
            </nav>
    );
};

export default NavBar;