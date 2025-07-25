import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/CheckBox";

import { useCheckin } from "./useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

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
`;

function CheckinBooking() {
	const moveBack = useMoveBack();
	const [confirmPaid, setConfirmPaid] = useState(false);
	const { checkin, isCheckingin } = useCheckin();

	const { data: booking, isLoading: isLoadingBooking } = useBooking();
	useEffect(() => setConfirmPaid(booking?.isPaid), [booking?.isPaid]);
	if (isLoadingBooking) return <Spinner />;
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

	function handleCheckin() {
		if (!confirmPaid) return;
		checkin(bookingId);
	}

	return (
		<Container>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<CheckBox
					checked={confirmPaid}
					onChange={() => setConfirmPaid(!confirmPaid)}
					disabled={booking?.isPaid}
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
