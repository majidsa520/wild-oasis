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
export default function Filter({ filterOptions, filterField }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageFilter = searchParams.get("page");
	const currentFilter =
		searchParams.get(filterField) || filterOptions.at(0).value;
	const setFilter = (value) => {
		pageFilter !== currentFilter && searchParams.set("page", "1");
		searchParams.set(filterField, value);
		setSearchParams(searchParams);
	};
	return (
		<StyledFilter>
			{filterOptions.map((filterOption) => (
				<FilterButton
					key={filterOption.value}
					value={filterOption.value}
					onClick={() => setFilter(filterOption.value)}
					active={currentFilter === filterOption.value}
					disabled={currentFilter === filterOption.value}
				>
					{filterOption.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}
