import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

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
		</StyledDashboardLayout>
	);
}
