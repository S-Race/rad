import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../styles/login_signup.css";

const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const updateUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const isValid = () => {
        if (user.username.length < 1 || user.password.length < 1 || user.confirmPassword.length < 1)
            return false;
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match");
            return false;
        }
        return true;
    };

    const signup = e => {
        e.preventDefault();

        if (!isValid()) return;

        fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: user.username, password: user.password })
        }).then(res => {
            res.json().then(json => {
                // if response status code is not 201, user creation error
                if (res.status !== 201)
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
                <h2 className="text-center mb-4 text-2xl text-gray-300">Create an account below</h2>
                <form className="h-1/2">
                    <FormInput label="Username" onChange={updateUser} value={user.username} name="username"/>
                    <FormInput label="Password" onChange={updateUser}
                        value={user.password} name="password" type="password"/>
                    <FormInput label="Confirm Password" onChange={updateUser}
                        value={user.confirmPassword} name="confirmPassword" type="password"/>
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