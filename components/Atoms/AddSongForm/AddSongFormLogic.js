import nprogress from "nprogress";

export const changeHandler = (e, formInputs) => {
	formInputs.current = {
		...formInputs.current,

		[e.target.name]:
			e.target.name !== "track" ? e.target.value : e.target.files[0],
	};

	// console.log(formInputs.current);
};

export const submitHandler = async (e, formInputs, token, setData, toast) => {
	e.preventDefault();

	const formData = new FormData();

	nprogress.start();

	for (let key in formInputs.current) {
		formData.append(key, formInputs.current[key]);
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/tracks/upload`,
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
		setData((prevData) => {
			const prevDataCopy = { ...prevData };
			prevDataCopy.tracks = [data.newTrack, ...prevData.tracks];
			return prevDataCopy;
		});

		e.target.reset();
		return toast({
			title: data.message || "Succes uploading track.",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
	}

	return toast({
		title: data.message || "Error uploading track, please try again.",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
