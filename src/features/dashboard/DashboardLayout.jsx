import styled from "styled-components";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;
export default function DashboardLayout() {
	const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
	const {
		confirmedStays,
		isLoading: isLoadingStays,
		numDays,
	} = useRecentStays();
	const { cabins, isLoading: isLoadingCabins } = useCabins();
	// if (isLoadingBookings || isLoadingCabins || isLoadingStays)
	// 	return <Spinner />;
	const numCabins = cabins?.length;
	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				numCabins={numCabins}
			/>
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}
