/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function Stats({
	bookings,
	confirmedStays,
	numDays,
	numCabins,
}) {
	const numBookings = bookings?.length;
	const sales = bookings?.reduce(
		(acc, booking) => acc + booking.totalPrice,
		0
	);
	const checkins = confirmedStays?.length;
	const occupationRate = Math.round(
		(confirmedStays?.reduce((acc, stay) => acc + stay.numNights, 0) /
			(numDays * numCabins)) *
			100
	);
	return (
		<>
			<Stat
				icon={<HiOutlineBriefcase />}
				color="blue"
				title="Bookings"
				value={numBookings}
			/>
			<Stat
				icon={<HiOutlineBanknotes />}
				color="green"
				title="Sales"
				value={sales ? formatCurrency(sales) : null}
			/>
			<Stat
				icon={<HiOutlineCalendarDays />}
				color="indigo"
				title="Bookings"
				value={checkins}
			/>
			<Stat
				icon={<HiOutlineChartBar />}
				color="yellow"
				title="Bookings"
				value={occupationRate ? `${occupationRate} %` : null}
			/>
		</>
	);
}
