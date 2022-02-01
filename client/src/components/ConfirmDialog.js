import React from "react";

const ConfirmDialog = ({ question, cancel, confirm }) => {
    return (
        <div className="bg-gray-900 shadow-xl lg:w-1/4 md:w-2/4 w-3/4 mx-auto md:my-48 my-28 rounded-md content">
            <header className="text-gray-100 text-xl flex justify-between items-center mb-4 p-4 pb-0">
                <span>{ question }</span>
                <span
                    className="text-3xl text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={cancel}
                >&times;</span>
            </header>

            <footer className="bg-gray-900 text-gray-100 text-xl flex justify-between mb-4 p-4 pt-0">
                <button className="bg-red-500 hover:bg-red-600 px-6 py-2 mx-2 transform active:scale-95 rounded-sm"
                    onClick={cancel}> No
                </button>
                <button className="bg-blue-600 hover:bg-blue-800 px-6 py-2 mx-2 transform active:scale-95 rounded-sm"
                    onClick={confirm}> Yes
                </button>
            </footer>
        </div>
    );
};

export default ConfirmDialog;