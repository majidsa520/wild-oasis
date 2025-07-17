import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
const filterOptions = [
	{ value: "all", label: "All" },
	{ value: "checked-out", label: "Checked out" },
	{ value: "checked-in", label: "Checked in" },
	{ value: "unconfirmed", label: "Uncofirmed" },
];
function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter filterField="status" filterOptions={filterOptions} />
		</TableOperations>
	);
}

export default BookingTableOperations;
