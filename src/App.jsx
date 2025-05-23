import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const H1 = styled.h1``;
const StyledApp = styled.main`
	padding: 20px;
`;
function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<H1>The Wild Oasis</H1>
				<Button>Check In</Button>
				<Button>Check Out</Button>
				<Input placeholder="CheckIn" />
				<Heading as="h4">this is heading!</Heading>
			</StyledApp>
		</>
	);
}

export default App;
