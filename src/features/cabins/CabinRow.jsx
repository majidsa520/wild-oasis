/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
	text-align: center;
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
	text-align: center;
`;
const Capacity = styled.div`
	font-family: "Sono";
	font-weight: 600;
	text-align: center;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
	text-align: center;
`;

function CabinRow({ cabin }) {
	const { createNewCabin, error: duplicationError } = useCreateCabin();

	const {
		name,
		discount,
		regularPrice,
		image,
		maxCapacity,
		id: cabinId,
		description,
	} = cabin;
	function handleDuplicate() {
		createNewCabin({
			name: `copy of ${name}`,
			discount,
			regularPrice,
			image,
			maxCapacity,
			description,
		});
	}
	const { isDeleting, removeCabin } = useDeleteCabin();
	return (
		<Table.Row>
			<div>
				<Img src={image} />
			</div>
			<Cabin>{name}</Cabin>
			<Capacity>{maxCapacity}</Capacity>
			<Price>{regularPrice}</Price>
			<Discount>{discount ? discount : "-"}</Discount>
			<div>
				<Modal>
					<Modal.Open opens="update-cabin">
						<Button variation="secondary" size="small">
							<HiPencil />
						</Button>
					</Modal.Open>
					<Modal.Window name="update-cabin">
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>
				</Modal>
				<Button
					variation="secondary"
					size="small"
					onClick={handleDuplicate}
				>
					<HiSquare2Stack />
				</Button>
				<Modal>
					<Modal.Open opens="confirm-delete">
						<Button
							variation="secondary"
							size="small"
							onClick={() => removeCabin(cabinId)}
							disabled={isDeleting}
						>
							<HiTrash />
						</Button>
					</Modal.Open>
					<Modal.Window name="confirm-delete">
						<ConfirmDelete
							onConfirm={() => removeCabin(cabinId)}
							resourceName={`cabin ${name}`}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default CabinRow;
