import nprogress from "nprogress";

export const submitHandler = async (
	formInputs,
	dispatch,
	setUser,
	router,
	toast
) => {

	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formInputs),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		// console.log(data);
		localStorage.setItem("musicverse_jwt", data.token);
		dispatch(setUser(data.user));
		return router.push("/");
	}

	return toast({
		title: data.message || "Login failed, please try again!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
