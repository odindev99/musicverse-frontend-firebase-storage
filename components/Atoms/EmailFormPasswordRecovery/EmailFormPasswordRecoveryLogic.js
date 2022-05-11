import nprogress from "nprogress";

export const submitHandler = async (formInputs, toast, setUserEmail) => {
	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/send-password-recovery-token`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formInputs),
		}
	);

	const data = await response.json();

	// console.log(response);
	nprogress.done();

	if (response.ok) {
		return setUserEmail(formInputs.email);
	}

	return toast({
		title: data.message || "Error creating user!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
