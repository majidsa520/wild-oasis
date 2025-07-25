/* eslint-disable no-constant-condition */
import styled, { css } from "styled-components";

const Heading = styled.h1`
	${(props) =>
		props.as === "h4" &&
		css`
			font-size: 3rem;
			text-align: center;
		`}
`;

export default Heading;
