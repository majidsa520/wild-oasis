import { useEffect, useRef } from "react";

export function useOutsideClick(callback) {
	const ref = useRef(null);
	useEffect(() => {
		function handleClick(e) {
			if (ref.current && e.target.contains(ref.current)) {
				callback();
			}
		}
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [callback]);
	return { ref };
}
