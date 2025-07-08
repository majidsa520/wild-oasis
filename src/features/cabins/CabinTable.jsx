import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { useCreateCabin } from "./useCreateCabin";
const Table = styled.table`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`;

const TableHeader = styled.tr`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function CabinTable() {
	const { cabins, isLoading, error } = useCabins();

	if (isLoading) return <Spinner />;

	return (
		<Table role="table">
			<thead>
				<TableHeader>
					<th></th>
					<th>Cabin</th>
					<th>Capacity</th>
					<th>Price</th>
					<th>Discount</th>
					<th></th>
				</TableHeader>
			</thead>
			<tbody>
				{cabins ? (
					cabins?.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)
				) : (
					<Error>Loading problem</Error>
				)}
			</tbody>
		</Table>
	);
}

export default CabinTable;
