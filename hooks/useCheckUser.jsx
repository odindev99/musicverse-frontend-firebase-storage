import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const useCheckUser = () => {
	const user = useSelector((state) => state.user.value);
	const router = useRouter();
	const toast = useToast();

	useEffect(() => {
		if (!user) {
			toast({
				title: "Please login to get access to this route!",
				status: "warning",
				position: "top-right",
				isClosable: true,
			});
			return router.push("/auth/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useCheckUser;
