import { useToast } from "@chakra-ui/react";
import useSWR from "swr";
import { useCallback } from "react";

const useGetRequest = (url, token) => {
	const toast = useToast();

	const fetcher = useCallback(async (url, token) => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { data, error, mutate } = useSWR(token ? [url, token] : url, fetcher);

	return {
		data,
		loading: !error && !data,
		error: error,
		mutate
	};
};

export default useGetRequest;
