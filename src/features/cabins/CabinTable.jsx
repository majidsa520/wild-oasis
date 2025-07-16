import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
	const { cabins, isLoading, error } = useCabins();
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("filterBy") || "all";
	let filteredCabins;
	switch (filterBy) {
		case "all":
			filteredCabins = cabins;
			break;
		case "with-discount":
			filteredCabins = cabins?.filter((cabin) => cabin.discount);
			break;
		case "no-discount":
			filteredCabins = cabins?.filter((cabin) => !cabin.discount);
			break;
		default:
			filteredCabins = cabins;
	}
	const sortBy = searchParams.get("sortBy") || "name-asc";
	const [sortField, sortDirection] = sortBy.split("-");
	console.log(filteredCabins);
	const sortModifier = sortDirection === "asc" ? 1 : -1;
	const sortedCabins = filteredCabins?.sort(
		(a, b) => (a[sortField] - b[sortField]) * sortModifier
	);
	if (isLoading) return <Spinner />;

	return (
		<Menus>
			<Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
