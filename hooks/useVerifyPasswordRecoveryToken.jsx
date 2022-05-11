import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const verifyPasswordRecoveryToken = async (token, setVerified, toast) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/verify-password-token/${token}`
	);

	const data = await response.json();

	if (response.ok) {
		toast({
			title:
				data.message ||
				"Success verifyin password recovery token, please enter your new password!",
			position: "top-right",
			isClosable: true,
			status: "success",
		});
		return setVerified(true);
	}

	toast({
		title:
			data.message ||
			"Error verifying password recovery token, please try again!",
		position: "top-right",
		isClosable: true,
		status: "error",
		id: "verify-account",
	});

	return setVerified(false);
};

const useVerifyPasswordRecoveryToken = (token) => {
	const toast = useToast();
	const [verified, setVerified] = useState(true);

	useEffect(() => {
		if (token) {
			verifyPasswordRecoveryToken(token, setVerified, toast);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return verified;
};

export default useVerifyPasswordRecoveryToken;
