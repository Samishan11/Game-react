import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoutes = () => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const token = localStorage.getItem('token')
    const user = parseJwt(token);
    return (
        user?.data?.verified ?
            <Outlet></Outlet>
            :
            <Navigate to='/login'></Navigate>

    )
}

export const ProtectedAdmin = () => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const token = localStorage.getItem('token')
    const user = parseJwt(token);
    return (
        user?.data?.isAdmin ?
            <Outlet></Outlet>
            :
            <Navigate to='/login'></Navigate>
    )
}
