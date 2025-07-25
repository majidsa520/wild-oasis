import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/CheckBox";
import { useSettings } from "../settings/useSetttings";

import { useCheckin } from "./useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

function CheckinBooking() {
	const moveBack = useMoveBack();
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { checkin, isCheckingin } = useCheckin();
	const { settings, isLoading: isLoadingSettings } = useSettings();

	const { data: booking, isLoading: isLoadingBooking } = useBooking();
	useEffect(() => setConfirmPaid(booking?.isPaid), [booking?.isPaid]);
	if (isLoadingBooking || isLoadingSettings) return <Spinner />;
	if (Object.keys(booking).length === 0 || !booking)
		return <Empty resourceName="booking" />;
	const {
		id: bookingId,
		guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights,
	} = booking;
	const optionalBreakfast = numGuests * numNights * settings.breakfastPrice;
	function handleCheckin() {
		if (!confirmPaid) return;
		if (addBreakfast)
			checkin({
				bookingId,
				breakfast: {
					extrasPrice: optionalBreakfast,
					totalPrice: totalPrice + optionalBreakfast,
					hasBreakfast: true,
				},
			});
		else checkin({ bookingId });
	}

	return (
		<Container>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				{!hasBreakfast && (
					<CheckBox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast(!addBreakfast);
							setConfirmPaid(false);
						}}
					>
						Want to add breakfast for{" "}
						{`${formatCurrency(
							totalPrice + optionalBreakfast
						)} (${formatCurrency(totalPrice)} + ${formatCurrency(
							optionalBreakfast
						)})`}
					</CheckBox>
				)}
				<CheckBox
					checked={confirmPaid}
					onChange={() => setConfirmPaid(!confirmPaid)}
					disabled={confirmPaid}
				>
					I confirm that user {guests.fullName} has paid the total amount
					of {formatCurrency(totalPrice)}
				</CheckBox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isCheckingin}
				>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</Container>
	);
}

export default CheckinBooking;
