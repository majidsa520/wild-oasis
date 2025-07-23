import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("status") || "all";
	const filter = { field: "status", filterBy };
	const sortBy = (searchParams.get("sortBy") || "startDate-asc").split("-");
	const sort = { sortField: sortBy.at(0), sortDirection: sortBy.at(1) };
	const page = searchParams.get("page") || "1";
	const {
		data: { data: bookings, count } = {},
		error,
		isLoading,
	} = useQuery({
		queryKey: ["bookings", filter, sort, Number(page)],
		queryFn: () => getBookings({ filter, sort, page }),
	});
	return { bookings, error, isLoading, count };
}
