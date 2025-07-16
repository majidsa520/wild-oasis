/* eslint-disable react/prop-types */
import { createContext } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
	font-size: 1.2rem;
	padding: 0.4rem 1.2rem;
	border: 1px solid
		${(props) =>
			props.type === "white"
				? "var(--color-grey-100)"
				: "var(--color-grey-300)"};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;
const SelectContext = createContext();
function Select({ children, ...props }) {
	return (
		<SelectContext.Provider value={""}>
			<StyledSelect {...props}>{children}</StyledSelect>
		</SelectContext.Provider>
	);
}
function Option({ children, ...props }) {
	return <option {...props}>{children}</option>;
}
Select.Option = Option;
export default Select;
