import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

const useGetPaginatedData = (endpoint, limit, token, search) => {
	const toast = useToast();
	const controller = new AbortController();
	const signal = controller.signal;

	const fetcher = useCallback(async (url, token) => {
		const response = !token
			? await fetch(url, {signal})
			: await fetch(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					signal,
					
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getKey = useCallback(
		(pageIndex, previousPageData) => {
			// reached the end
			if (previousPageData && previousPageData.length < limit) return null;
			// add the offset to the API endpoint
			return `${
				process.env.NEXT_PUBLIC_API_URL
			}${endpoint}?limit=${limit}&offset=${pageIndex * limit}${
				search && `&search=${search}`
			}`;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[search]
	);

	const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
		(...args) => (!token ? getKey(...args) : [getKey(...args), token]),
		fetcher
	);

	return {
		data,
		loading: !error && !data,
		isValidating,
		error,
		size,
		setSize,
		mutate,
		controller
	};
};

export default useGetPaginatedData;
