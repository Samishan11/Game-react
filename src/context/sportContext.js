import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const SportContext = createContext();

export const SportProvider = (props) => {
    const [sport, setSport] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/api/get-sport').then(function (result) {
            setSport(result.data)
        })
    }, [])

    return (
        <SportContext.Provider value={[sport, setSport]}>
            {props.children}
        </SportContext.Provider>
    )
}