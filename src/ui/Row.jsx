import styled, { css } from "styled-components";

const directions = {
	hor: css`
		justify-content: space-between;
	`,
	ver: css`
		flex-direction: column;
		gap: 2rem;
	`,
};

const Row = styled.div`
	display: flex;

	${(props) => directions[props.dir]}
`;
Row.defaultProps = { dir: "hor" };
export default Row;
