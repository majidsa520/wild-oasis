import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen="false" />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="/dashboard" />} />
						<Route path="/account" element={<Account />} />
						<Route path="/bookings/:bookingId" element={<Booking />} />
						<Route path="/bookings" element={<Bookings />} />
						<Route path="/checkin/:bookingId" element={<Checkin />} />
						<Route path="/cabins" element={<Cabins />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/settings" element={<Settings />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/users" element={<Users />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster
				position="top-center"
				gutter={24}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					error: { duration: 5000 },
					success: { duration: 2000 },
					style: { padding: "16px 24px" },
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
