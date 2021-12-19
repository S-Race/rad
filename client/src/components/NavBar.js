import React from "react";
import { Link } from "react-router-dom";

import { useUserContext } from "../UserContext";

const NavBar = () => {
    const { user } = useUserContext();

    return (
        user.username ?
            <nav className="flex flex-col md:flex-row px-8 bg-gray-900 justify-between">
                <div className="flex items-center space-x-3">
                    <Link to="/dashboard" className="block p-3 text-white">Home</Link>
                    <a className="block p-3 text-white">Library</a>
                    <a className="block p-3 text-white">Playlists</a>
                </div>

                <div className="flex items-center space-x-3">
                    <a className="block p-3 text-white">
                        <img src="images/sr.jpg" className="object-contain h-12 w-24"/>
                    </a>
                </div>

                <div className="flex items-center space-x-3">
                    <Link to="/settings" className="block p-3">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94
                                    3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724
                                    1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572
                                    1.065c-.426 1.756-2.924 1.756-3.35
                                    0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                                    00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724
                                    1.724 0 001.066-2.573c-.94-1.543.826-3.31
                                    2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                    <span className="block p-3 text-white">{user.username}</span>
                    <div className="container py-4 flex mx-auto">
                        <div className="flex border-2 rounded">
                            <button className="flex items-center justify-center px-4 border-r bg-gray-900">
                                <svg className="w-6 h-6 text-white" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10
                                            16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                                    </path>
                                </svg>
                            </button>
                            <input type="text"
                                className="px-4 py-2 w-40 focus:outline-none bg-gray-100
                                focus:bg-blue-400 focus:text-gray-50 focus:placeholder-gray-50"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                </div>
            </nav>
            :
            <nav className="bg-gray-900 p-5 flex justify-end">
                <Link to="/login" className="text-gray-100 font-medium text-xl mx-4">Login</Link>
                <Link to="/signup" className="text-gray-100 font-medium text-xl mx-4">Sign up</Link>
            </nav>
    );
};

export default NavBar;