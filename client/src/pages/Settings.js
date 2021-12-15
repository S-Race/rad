import React, { useState, useEffect } from "react";

import Modal from "../components/Modal";
import DirectoryChooser from "../components/DirectoryChooser";

const Settings = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const [libraries, setLibraries] = useState([]);

    const addLibrary = path => {
        fetch("/api/library", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path })
        }).then(res => {
            res.json().then(json => {
                // if response status code is not 201, adding error
                if (res.status !== 201)
                    alert(json.msg);
                else {
                    alert(json.msg); // will this a better ui later
                    getLibraries();
                    closeModal();
                }
            }).catch(e => console.log(e));
        }).catch((e) => console.log(e));
    };

    const getLibraries = async () => {
        try {
            const res = await fetch("/api/library", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200)
                setLibraries(await res.json());
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => getLibraries())();
    }, []);

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 border-0"
                onClick={() => setModalOpen(true)}>Add a library</button>

            <ul className="my-5 p-4">
                {
                    libraries.map((l, i) => <li key={i}>{l}</li>)
                }
            </ul>
            <Modal open={modalOpen} close={closeModal}>
                <DirectoryChooser onClickAdd={addLibrary} onCancel={closeModal} />
            </Modal>
        </div>
    );
};

export default Settings;