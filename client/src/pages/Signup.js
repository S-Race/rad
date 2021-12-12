import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login_signup.css";

import { useUserContext } from "../UserContext";

const Signup = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { dispatch, userActions } = useUserContext();

    const signup = e => {
        e.preventDefault();
        if (!username) return;

        fetch("/api/auth/" + username, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            res.json().then(json => {
                // if response status code is not 201, user creation error
                if (res.status !== 201)
                    alert(json.msg);
                else {
                    // auto login user after sign and redirect them to the dashboard
                    dispatch({
                        type: userActions.LOGIN,
                        payload: {
                            username: json.username,
                            id: json.id,
                        }
                    });
                    console.log(json.username);
                    navigate("/dashboard");
                }
            }).catch(e => console.log(e));
        }).catch((e) => console.log(e));
    };

    return (
        <div className="bg-gray-800 h-screen flex items-center wave">
            <div className="py-20 px-16 rounded-md md:w-1/2 mx-auto glass shadow-xl z-10">
                <h2 className="text-center mb-4 text-2xl text-gray-300">Enter a desired username</h2>
                <form className="h-1/2">
                    <div className="relative mt-5 mb-10 mx-0">
                        <input
                            className="bg-transparent border-b-2 border-solid border-gray-300 block w-full py-4
                                text-lg text-gray-300 focus:outline-none focus:border-blue-600 valid:outline-none
                                valid:border-blue-600"
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                        <label className="absolute top-4 left-0 pointer-events-none">
                            <span className="text-lg block text-gray-300">Username</span>
                        </label>
                    </div>
                    <button onClick={signup} className="w-full bg-blue-600 hover:bg-blue-700 p-4 text-gray-300
                        text-base border-none border-r-4 focus:outline-none transform hover:scale-95">
                        Register
                    </button>
                    <p className="mt-7 text-gray-300">
                        Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Signup;