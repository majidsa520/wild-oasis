import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
	padding: 20px;
`;
function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row dir="ver">
					<Row>
						<Heading>The Wild Oasis</Heading>
						<div>
							<Button>Check In</Button>
							<Button variation="secondary">Check Out</Button>
						</div>
					</Row>
					<Row dir="ver">
						<Heading as="h4">Form</Heading>
						<div>
							<Input placeholder="CheckIn" />
							<Input placeholder="CheckOut" />
						</div>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
