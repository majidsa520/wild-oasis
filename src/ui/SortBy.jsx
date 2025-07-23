/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ sortOptions }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "name-asc";
	//const [sortField, sortDirection] = sortBy.split("-");
	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		searchParams.set("page", 1);
		setSearchParams(searchParams);
	}
	return (
		<Select type="white" value={sortBy} onChange={handleChange}>
			{sortOptions.map((sortOption) => (
				<Select.Option value={sortOption.value} key={sortOption.value}>
					{sortOption.label}
				</Select.Option>
			))}
		</Select>
	);
}
