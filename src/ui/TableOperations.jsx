import styled from "styled-components";
import Filter from "./Filter";

const TableOperationsDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
`;

export default function TableOperations() {
	return (
		<TableOperationsDiv>
			<Filter>
				<Filter.Panel>
					<Filter.Button filter="all">all</Filter.Button>
					<Filter.Button filter="with-discount">
						with discount
					</Filter.Button>
					<Filter.Button filter="no-discount">no discount</Filter.Button>
				</Filter.Panel>
			</Filter>
		</TableOperationsDiv>
	);
}
