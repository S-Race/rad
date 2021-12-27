import React from "react";

const FormInput = ({ label, onChange, value, name, type="text" }) => {
    return (
        <div className="relative mt-5 mb-10 mx-0">
            <input
                className="bg-transparent border-b-2 border-solid border-gray-300 block w-full py-4
                    text-lg text-gray-300 focus:outline-none focus:border-blue-600 valid:outline-none
                    valid:border-blue-600"
                type={type} name={name} onChange={onChange} value={value}
                required
            />
            <label className="absolute top-4 left-0 pointer-events-none">
                <span className="text-lg block text-gray-300">{label}</span>
            </label>
        </div>
    );
};

export default FormInput;