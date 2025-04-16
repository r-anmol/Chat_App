import {create} from "zustand" // a lightweight state management library (like Redux )

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme")|| "coffee" , 
    setTheme : (theme) => {
        localStorage.setItem("chat-theme" , theme);
        set({theme})
    }
}));