import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

export const NewsProvider = (props) => {
    const [news, setNews] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/api/news').then(function (result) {
            setNews(result.data)
        })
    }, [])

    return (
        <NewsContext.Provider value={[news, setNews]}>
            {props.children}
        </NewsContext.Provider>
    )
}