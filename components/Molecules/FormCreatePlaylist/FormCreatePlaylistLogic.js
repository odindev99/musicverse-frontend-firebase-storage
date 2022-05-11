import nprogress from "nprogress";

export const submitHandler = async (e, formInputs, token, setData, toast) => {
	e.preventDefault();

	const formData = new FormData();

	for (let key in formInputs.current) {
		formData.append(key, formInputs.current[key]);
	}

	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/playlists/add`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		e.target.reset();

		setData((prevData) => {
			const prevDataCopy = { ...prevData };
			prevDataCopy.userPlaylistsQuantity =
				prevDataCopy.userPlaylistsQuantity + 1;
			prevDataCopy.playlists = [data.newPlaylist, ...prevData.playlists];
			return prevDataCopy;
		});

		return toast({
			title: data.message || "Success creating playlist!",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
	}

	return toast({
		title: data.message || "Error creating playlist!",
		description: "Please try again later",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};

export const changeHandler = (e, formInputs) => {
	formInputs.current = {
		...formInputs.current,
		[e.target.name]:
			e.target.name !== "cover" ? e.target.value : e.target.files[0],
	};

	// console.log(formInputs.current);
};
