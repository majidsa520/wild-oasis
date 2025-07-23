import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
const filterOptions = [
	{ value: "all", label: "All" },
	{ value: "checked-out", label: "Checked out" },
	{ value: "checked-in", label: "Checked in" },
	{ value: "unconfirmed", label: "Uncofirmed" },
];
const sortOptions = [
	{ value: "startDate-asc", label: "Sort by date (recent first)" },
	{ value: "startDate-desc", label: "Sort by date (earilier first)" },
	{ value: "totalPrice-desc", label: "Sort by amount (high first)" },
	{ value: "totalPrice-asc", label: "Sort by amount (low first)" },
];
function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter filterField="status" filterOptions={filterOptions} />
			<SortBy sortOptions={sortOptions} />
		</TableOperations>
	);
}

export default BookingTableOperations;
