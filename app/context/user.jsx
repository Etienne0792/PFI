import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig'; // Assuming your firebase config is exported from here
import { useNavigation } from '@react-navigation/native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState(null);
    
    //Permet de recuperer el nom de l'utilisateur
    const getUserName = async () => {
        const db = getFirestore(app);
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            setUserName(userDocSnap.data().username);
        } else {
            setUserId(""); 
            useNavigation().navigate('Login');
        }
    }  

    //met le nom d'utilisateur a jour
    useEffect(() => {getUserName();}, [userId]);

    const value = { userId, setUserId, userName };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};