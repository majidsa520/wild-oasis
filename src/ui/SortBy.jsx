import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy() {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "name-asc";
	//const [sortField, sortDirection] = sortBy.split("-");
	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}
	return (
		<Select type="white" value={sortBy} onChange={handleChange}>
			<Select.Option value="name-asc">Sort by name (A-Z)</Select.Option>
			<Select.Option value="name-desc">Sort by name (Z-A)</Select.Option>
			<Select.Option value="regularPrice-asc">
				Sort by price (low first)
			</Select.Option>
			<Select.Option value="regularPrice-desc">
				Sort by price (high first)
			</Select.Option>
			<Select.Option value="maxCapacity-asc">
				Sort by capacity (low first)
			</Select.Option>
			<Select.Option value="maxCapacity-desc">
				Sort by capacity (high first)
			</Select.Option>
		</Select>
	);
}
