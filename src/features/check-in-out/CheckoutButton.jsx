/* eslint-disable react/prop-types */
import { HiArrowDownOnSquare } from "react-icons/hi2";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
	const { checkout, isCheckingut } = useCheckout();
	return (
		<Button
			$variation="secondary"
			$size="small"
			onClick={() => checkout(bookingId)}
		>
			{isCheckingut ? <SpinnerMini /> : "Check out"}
		</Button>
	);
}

export default CheckoutButton;
