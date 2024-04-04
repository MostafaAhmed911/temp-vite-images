import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDarkMode = localStorage.getItem('darkTheme');
 
    if (storedDarkMode === null) {
        return prefersDarkMode;
    }
 
    return storedDarkMode === 'true';
};

export const AppProvider = ({children}) =>{
    const [isDarkTheme, setisDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState('hollywood');

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setisDarkTheme(newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
        // const body = document.querySelector('body');
        // body.classList.toggle('dark-theme', newDarkTheme);
        // console.log(body);
    };

    useEffect(()=>{
        document.body.classList.toggle('dark-theme', isDarkTheme)
    },[isDarkTheme])
    return (
        <AppContext.Provider value={{toggleDarkTheme, isDarkTheme, searchTerm, setSearchTerm}}>
            {children}
        </AppContext.Provider>
    ) ;
};

export const useGlobalContext = () => useContext(AppContext);