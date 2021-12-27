import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

import "../styles/login_signup.css";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const updateUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const login = e => {
        e.preventDefault();

        if (user.username.length < 1 || user.password.length < 1)
            return;

        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...user })
        }).then(res => {
            res.json().then(json => {
                // if response status code is not 200, login error
                if (res.status !== 200)
                    alert(json.msg);
                // navigate to dashboard which is protected route, therefore protected routes
                // component will try to get the token based on the cookie we just received
                else navigate("/dashboard");
            }).catch(e => console.log(e));
        }).catch((e) => console.log(e));
    };

    return (
        <div className="bg-gray-800 h-screen flex items-center wave">
            <div className="py-20 px-16 rounded-md md:w-1/2 mx-auto glass shadow-xl z-[5]">
                <h2 className="text-center mb-4 text-2xl text-gray-300">Please Login</h2>
                <form className="h-1/2">
                    <FormInput label="Username" onChange={updateUser} value={user.username} name="username"/>
                    <FormInput label="Password" onChange={updateUser}
                        value={user.password} name="password" type="password"/>
                    <button onClick={login} className="w-full bg-blue-600 hover:bg-blue-700 p-4 text-gray-300
                        text-base border-none border-r-4 focus:outline-none transform hover:scale-95">
                        Login
                    </button>
                    <p className="mt-7 text-gray-300">
                        Don&apos;t have an account? <Link to="/signup" className="text-blue-400">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Login;