const fetcher = async (url, token) => {
	const response = !token
		? await fetch(url)
		: await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
		  });

	const data = await response.json();

	if (response.ok) {
		return data;
	}

	const error = new Error(
		data.message || "A ocurrido un error por favor intente de nuevo!"
	);

	toast({
		title: data.message || "Error getting data!",
		position: "top-right",
		isClosable: true,
		status: "error",
	});

	throw error;
};
