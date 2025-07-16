/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.2rem;
	/* To give the same height as select */
	padding: 0.2rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;
const FilterContext = createContext();
function Filter({ children }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const filterBy = searchParams.get("filterBy");
	const setFilterBy = (value) => {
		searchParams.set("filterBy", value);
		setSearchParams(searchParams);
	};
	return (
		<FilterContext.Provider value={{ filterBy, setFilterBy }}>
			{children}
		</FilterContext.Provider>
	);
}
function Panel({ children }) {
	return <StyledFilter>{children}</StyledFilter>;
}
function Button({ children, filter, ...props }) {
	const { filterBy, setFilterBy } = useContext(FilterContext);
	return (
		<FilterButton
			onClick={() => setFilterBy(filter)}
			{...props}
			active={filterBy === filter}
			disabled={filterBy === filter}
		>
			{children}
		</FilterButton>
	);
}
Filter.Panel = Panel;
Filter.Button = Button;
export default Filter;
