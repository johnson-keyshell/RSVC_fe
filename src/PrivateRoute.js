import React from 'react';
import { Route,path, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({  element: Element, allowedRoles, path }) => {
    const userRole = ['buyer']
    // Check if the user's role is allowed for the route
    const isAllowed = allowedRoles.includes(userRole);

    return (
        <Route path={path} element={<Element/>} />

    );
};

export default PrivateRoute;
