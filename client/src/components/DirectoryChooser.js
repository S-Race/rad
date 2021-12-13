import React, { useState, useEffect } from "react";

const DirectoryChooser = ({ headerText="Choose A Directory" }) => {
    const [path, setPath] = useState("");
    const [dirs, setDirs] = useState([]);
    const [isRoot, setIsRoot] = useState(true);

    useEffect(() => {
        // get dir listing from root at the server

        setPath(); // the current path ... initally the path of root
        setDirs(); // the directories in the current path
        setIsRoot(); // if the current path is the root ... intially this is true
    }, []);

    const ls = dir => {
        // get a listing of the selected dir
        fetch(dir).then(() => {
            setPath();
            setDirs();
            setIsRoot();
        }).catch((e) => console.log(e));
    };

    const goUp = () => {
        // request the parent dir
    };

    return (
        <div className="bg-gray-800 shadow-xl">
            <header className="bg-gray-900 text-gray-100 text-xl flex justify-between mb-4 p-4">
                <span>{ headerText }</span>
                <span id="closeBtn" className="text-3xl text-gray-500 hover:text-red-500 cursor-pointer">&times;</span>
            </header>
            <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="bg-gray-500 text-gray-100 focus:bg-gray-400 focus:text-gray-900
                    p-2 mb-3 mx-6 w-4/5 rounded-md focus:outline-none"
            />
            <ul>
                {
                    !isRoot ? <li
                        className="p-2 text-gray-200 hover:bg-blue-700 cursor-pointer bg-gray-600"
                        onClick={goUp}>.. [Back]</li> : <></>
                }
                {dirs.map((dir, key) =>
                    <li key={key}
                        className={"p-2 text-gray-200 hover:bg-blue-700 cursor-pointer bg-gray-"
                            + (key % 2 === 0) ? "500" : "600"}
                        onClick={() => ls(dir)}>
                        {dir.name}
                    </li>
                )}
            </ul>
            <footer className="bg-gray-900 text-gray-100 text-xl flex justify-end mb-4 p-4">
                <button className="bg-red-700 hover:bg-red-800 px-4 py-2 mx-2 transform active:scale-95 rounded-sm">
                    Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 mx-2 transform active:scale-95 rounded-sm">
                    Add
                </button>
            </footer>
        </div>
    );
};

export default DirectoryChooser;