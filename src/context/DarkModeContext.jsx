/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window.matchMedia("(prefers-color-scheme: dark)"),
		"isDarkMode"
	);
	function toggleDarkMode() {
		setIsDarkMode(!isDarkMode);
	}
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);
	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}
function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error("dark mode is used outside of dark mode provider");
	return context;
}
export { useDarkMode, DarkModeProvider };
