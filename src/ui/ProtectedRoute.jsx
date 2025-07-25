/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
	const { isAuthenticated, isLoading } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		//toast.error("You must login first");
		if (!isAuthenticated && !isLoading) navigate("/login");
	}, [isAuthenticated, isLoading, navigate]);
	if (isLoading) return <Spinner />;
	if (isAuthenticated) return children;
}
