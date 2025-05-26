import { useEffect } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import CabinRow from "../features/cabins/CabinRow";

function Cabins() {
	useEffect(() => {
		//const cabins = await getCabins()
		//console.log(cabins);
	}, []);

	return (
		<Row type="vertical">
			<Heading as="h1">All cabins</Heading>
			<CabinTable>
				<CabinRow></CabinRow>
			</CabinTable>
		</Row>
	);
}

export default Cabins;
