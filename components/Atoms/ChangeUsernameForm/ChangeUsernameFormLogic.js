import { updateUser } from "store/reducers/user";
import nprogress from "nprogress";

export const submitHandler = async (
	formInputs,
	token,
	dispatch,
	closeModal,
	toast
) => {

	const newUsername = formInputs.username;
  
	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/change-username`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ newUsername }),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		dispatch(updateUser({ username: newUsername }));

		closeModal();

		return toast({
			title: data.message || "Username changed!",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
	}

	return toast({
		title: data.message || "Error updating username, please try again!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
