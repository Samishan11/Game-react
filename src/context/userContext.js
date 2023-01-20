import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/api/get-user').then(function (result) {
            setUser(result.data)
        })
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}