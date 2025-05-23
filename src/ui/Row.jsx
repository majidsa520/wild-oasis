import styled, { css } from "styled-components";

const directions = {
	horizontal: css`
		justify-content: space-between;
	`,
	vertical: css`
		flex-direction: column;
		gap: 2rem;
	`,
};

const Row = styled.div`
	display: flex;

	${(props) => directions[props.dir]}
`;
Row.defaultProps = { type: "horizontal" };
export default Row;
