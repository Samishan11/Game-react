import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const TeamContext = createContext();

export const TeamProvider = (props) => {
    const [team, setTeam] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/api/get-team').then(function (result) {
            setTeam(result.data)
        })
    }, [])

    return (
        <TeamContext.Provider value={[team, setTeam]}>
            {props.children}
        </TeamContext.Provider>
    )
}