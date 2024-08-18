import React, { createContext, useState } from 'react';

const initialUserState = {
    username: null,
    email: null,
    profilePic: "/avo.jpg",
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialUserState);

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
