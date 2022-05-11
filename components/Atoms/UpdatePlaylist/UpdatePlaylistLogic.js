import nprogress from "nprogress";

export const changeHandler = (e, formInputs) => {
	formInputs.current = {
		...formInputs.current,
		[e.target.name]:
			e.target.name !== "cover" ? e.target.value : e.target.files[0],
	};

	console.log(formInputs.current);
};

export const submitHandler = async (
	e,
	formInputs,
	playlistId,
	token,
	setData,
	toast,
	closeModal
) => {
	e.preventDefault();

	nprogress.start();

	const formData = new FormData();

	for (let key in formInputs.current) {
		formData.append(key, formInputs.current[key]);
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/playlists/update/${playlistId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		setData((prevData) => {
			const prevDataCopy = { ...prevData };

			prevDataCopy.playlistDetails = {
				...prevDataCopy.playlistDetails,
				...data.changes,
			};

			return prevDataCopy;
		});

		closeModal();

		return toast({
			title: data.message || "Success updating playlist!",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
	}

	return toast({
		title: data.message || "Failed updating playlist, please try again!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
