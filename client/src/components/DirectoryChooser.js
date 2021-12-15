import React, { useState, useEffect } from "react";
const p = require("path");

const DirectoryChooser = ({ headerText="Choose A Directory", onClickAdd, onCancel }) => {
    const [path, setPath] = useState("");
    const [dirs, setDirs] = useState([]);
    const [isRoot, setIsRoot] = useState(true);

    useEffect(() => {
        // get dir listing from root at the server
        (async () => {
            const res = await fetch("/api/ls", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status !== 200) {
                alert("A critical error occurred");
                return;
            }

            const { path, dirs, root } = await res.json();

            setPath(path); // the current path ... initally the path of root
            setDirs(dirs); // the directories in the current path
            setIsRoot(root); // if the current path is the root ... intially this is true
        })();
    }, []);

    const ls = dir => {
        // get a listing of the selected dir
        fetch("/api/ls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ dir })
        }).then(res => {
            if (res.status !== 200) {
                alert("An error occurred trying to list that directory");
                return;
            }

            res.json().then(json => {
                setPath(json.path);
                setDirs(json.dirs);
                setIsRoot(json.root);
            });
        }).catch((e) => console.log(e));
    };

    // request the parent dir
    const goUp = () => ls(p.dirname(path));

    return (
        <div className="bg-gray-800 shadow-xl md:w-3/5 w-11/12 mx-auto md:my-12 my-4 rounded-md content">
            <header className="bg-gray-900 text-gray-100 text-xl flex justify-between mb-4 p-4">
                <span>{ headerText }</span>
                <span
                    className="text-3xl text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={onCancel}
                >&times;</span>
            </header>
            <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="bg-gray-500 text-gray-100 focus:bg-gray-400 focus:text-gray-900
                    p-2 mb-3 mx-6 w-4/5 rounded-md focus:outline-none"
            />
            <ul className="mx-6 mb-2 overflow-y-scroll h-96">
                {
                    !isRoot ? <li
                        className="p-2 text-gray-200 hover:bg-blue-700 cursor-pointer bg-gray-600"
                        onClick={goUp}>.. [Back]</li> : <></>
                }
                {dirs.map((dir, key) =>
                    <li key={key}
                        className={"p-2 text-gray-200 hover:bg-blue-700 cursor-pointer bg-gray-"
                            + (key % 2 === 0 ? "500" : "600")}
                        onClick={() => ls(dir)}>
                        {p.basename(dir)}
                    </li>
                )}
            </ul>
            <footer className="bg-gray-900 text-gray-100 text-xl flex justify-end mb-4 p-4">
                <button className="bg-red-700 hover:bg-red-800 px-4 py-2 mx-2 transform active:scale-95 rounded-sm"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 mx-2 transform active:scale-95 rounded-sm"
                    onClick={() => onClickAdd(path)}
                >
                    Add
                </button>
            </footer>
        </div>
    );
};

export default DirectoryChooser;