import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const verifyAccount = async (token, setVerified, toast) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/verify-account/${token}`
	);

	const data = await response.json();

	if (response.ok) {
		return setVerified(true);
	}

	toast({
		title: data.message || "Error verifying user, please try again!",
		position: "top-right",
		isClosable: true,
		status: "error",
		id: "verify-account",
	});

	return setVerified(false);
};

const useVerifyAccount = (token) => {
	const toast = useToast();
	const [verified, setVerified] = useState(true);

	useEffect(() => {
		if (token) {
			verifyAccount(token, setVerified, toast);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return verified;
};

export default useVerifyAccount;
