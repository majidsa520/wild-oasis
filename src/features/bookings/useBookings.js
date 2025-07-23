import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/consts";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("status") || "all";
	const filter = { field: "status", filterBy };
	const sortBy = (searchParams.get("sortBy") || "startDate-asc").split("-");
	const sort = { sortField: sortBy.at(0), sortDirection: sortBy.at(1) };
	const page = Number(searchParams.get("page")) || 1;
	const {
		data: { data: bookings, count } = {},
		error,
		isLoading,
	} = useQuery({
		queryKey: ["bookings", filter, sort, page],
		queryFn: () => getBookings({ filter, sort, page }),
	});
	// Prefetching data for pagination
	const pageCount = Math.ceil(count / PAGE_SIZE);
	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sort, page + 1],
			queryFn: () => getBookings({ filter, sort, page: page + 1 }),
		});
	}
	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sort, page - 1],
			queryFn: () => getBookings({ filter, sort, page: page - 1 }),
		});
	}
	return { bookings, error, isLoading, count };
}
