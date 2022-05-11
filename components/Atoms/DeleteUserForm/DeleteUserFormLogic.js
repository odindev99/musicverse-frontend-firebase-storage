const nprogress = require("nprogress");
import { setUser } from "store/reducers/user";

export const submitHandler = async (
	formInputs,
	email,
	token,
	router,
	toast,
	dispatch
) => {
	const confirmationToken = formInputs.confirmationToken;

	const bodyData = {
		confirmationToken,
		email,
	};

	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/delete-account`,
		{
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bodyData),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		router.push("/");
		toast({
			title: data?.message || "Success deleting user!",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
		localStorage.removeItem("musicverse_jwt");
		return dispatch(setUser(null));
	}

	return toast({
		title: data?.message || "Error deleting user, please try again!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
