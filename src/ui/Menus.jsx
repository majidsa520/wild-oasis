/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
	/* display: flex;
	align-items: center;
	justify-content: flex-end; */
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	left: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;
`;

const StyledItem = styled.li`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	gap: 1.6rem;
	cursor: pointer;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;
const MenusContext = createContext();
function Menus({ children }) {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState({});
	const open = setOpenId;
	const close = () => setOpenId("");
	return (
		<MenusContext.Provider
			value={{ open, close, openId, position, setPosition }}
		>
			{children}
		</MenusContext.Provider>
	);
}

function Toggle({ children, id }) {
	const { open, close, openId, setPosition } = useContext(MenusContext);
	function handleClick(e) {
		const listTag = e.target.closest("list");
		console.log(listTag);
		if (id === "" || id !== openId) {
			open(id);
			console.log({ x: e.clientX, y: e.clientY });
			setPosition({ x: e.clientX, y: e.clientY });
		} else close();
	}
	return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}
function List({ children, id }) {
	const { openId, close, position } = useContext(MenusContext);
	const { ref } = useOutsideClick(close);
	if (id === openId) {
		return createPortal(
			<StyledList position={position} ref={ref}>
				{children}
			</StyledList>,
			document.body
		);
	}
	return null;
}
function Item({ children, onClick, icon }) {
	const { close } = useContext(MenusContext);
	function handleClick() {
		onClick?.();
		close();
	}
	return (
		<StyledItem onClick={handleClick}>
			{icon}
			<span>{children}</span>
		</StyledItem>
	);
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Item = Item;

export default Menus;
