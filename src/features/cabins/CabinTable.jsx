import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

function CabinTable() {
	const { cabins, isLoading, error } = useCabins();

	if (isLoading) return <Spinner />;

	return (
		<Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			{cabins ? (
				cabins?.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)
			) : (
				<Error>Loading problem</Error>
			)}
		</Table>
	);
}

export default CabinTable;
