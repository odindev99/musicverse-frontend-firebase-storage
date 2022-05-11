import nprogress from "nprogress";

export const deleteRequest = async (
	email,
	token,
	showDeleteUserForm,
	toast
) => {
	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/send-delete-account-token`,
		{
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ email }),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		return showDeleteUserForm();
	}

	return toast({
		title: data?.message || "Error deleting acount, please try again!",
		status: "successs",
		position: "top-right",
		isClosable: true,
	});
};
