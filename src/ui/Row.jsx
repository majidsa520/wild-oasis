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
	margin-bottom: 24px;

	${(props) => directions[props.type]}
`;
Row.defaultProps = { type: "horizontal" };
export default Row;
