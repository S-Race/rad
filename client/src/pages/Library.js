import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import LibraryItem from "../components/LibraryItem";
import Loader from "../components/Loader";
import PageButton from "../components/PageButton";

import { useSearchContext } from "../SearchContext";
import { useUserContext } from "../UserContext";

const Library = () => {
    const [libraryLoaded, setlibraryLoaded] = useState(false);
    const [library, setLibrary] = useState([]);

    const onItemClick = useOutletContext();
    const { search } = useSearchContext();
    const { user: { token } } = useUserContext();

    const [page, setPage] = useState({
        current: 1,
        total: 0
    });
    const WINDOW = useRef(100);
    const changePage = number => setPage({ ...page, current: number });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [page]);

    const getResults = async (query) => {
        const data = await fetch("/api/libraryItems" + (query?.length > 1 ? "?search=" + query : ""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        if (data.status === 200) {
            const d = await data.json();
            setLibrary(d);
            setPage({
                current: 1,
                total: Math.ceil(d.length / WINDOW.current)
            });
        }
        // TODO if error display an error message saying cant load the library
        setlibraryLoaded(true);
    };

    useEffect(() => getResults(search), [search]);

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen p-5">
            {
                libraryLoaded ? (
                    <>
                        <ul>
                            { library.map((item, i) =>
                                <li key={i}><LibraryItem metadata={item} click={onItemClick}/></li>)
                                .slice((page.current - 1) * WINDOW.current,
                                    (page.current - 1) * WINDOW.current + WINDOW.current)}
                        </ul>
                        <div className="flex justify-evenly w-5/6 mx-auto">
                            {
                                Array(page.total)
                                    .fill(0)
                                    .map((_, j) =>
                                        <PageButton key={j} id={j+1}
                                            click={changePage} active={j+1 === page.current} />)
                            }
                        </div>
                    </>
                ) : <Loader text="Loading your library"/>
            }
        </div>
    );
};

export default Library;