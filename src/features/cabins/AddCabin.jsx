import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpenModal(!isOpenModal)}>
				Add a new cabin
			</Button>
			{isOpenModal && (
				<Modal onCloseModal={() => setIsOpenModal(false)}>
					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
				</Modal>
			)}
		</>
	);
}

export default AddCabin;
