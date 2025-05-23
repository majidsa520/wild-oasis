/* eslint-disable no-constant-condition */
import styled, { css } from "styled-components";

const Heading = styled.h1`
	${1 > 2
		? css`
				color: green;
		  `
		: css`
				color: red;
		  `}
`;

export default Heading;
