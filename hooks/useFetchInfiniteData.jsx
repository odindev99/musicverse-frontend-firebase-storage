import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

//# se recibira por parametro el endpoint, y el observer
const useFetchInfiniteData = (endpoint, limit, token, dataArrayProperty) => {
	const [data, setData] = useState([]);
	const [offset, setOffset] = useState(0);
	const [search, setSearch] = useState();
	const previousSearch = useRef();
	const [loading, setLoading] = useState();
	const toast = useToast();
	const observer = useRef();

	useEffect(() => {
		setLoading(true);
		let cancel;

		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
				params: {
					limit,
					offset,
					search: search || undefined,
				},
				headers: {
					Authorization: token ? `Bearer ${token}` : '',
				},
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((response) => {
				if (offset === 0) {
					setData(response.data);
				} else {
					setData((prevData) => {
						const prevDataCopy = { ...prevData };
						prevDataCopy[dataArrayProperty] = [
							...prevDataCopy[dataArrayProperty],
							...response.data[dataArrayProperty],
						];

						return prevDataCopy;
					});
				}

				if (search) {
					previousSearch.current = search;
				}

				return setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				if (axios.isCancel(e)) return;

				if (e.response) {
					return toast({
						title: e.response.data.message || "Error getting data!",
						position: "top-right",
						isClosable: true,
						status: "error",
					});
				}

				return toast({
					title: "Error getting data!",
					position: "top-right",
					isClosable: true,
					status: "error",
				});
			});

		return () => cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, offset]);

	//# Intersection observer handler to manage infinite loading
	const lastItemToObserve = useCallback(
		(node) => {
			if (loading || !data) return;
			if (observer.current) observer.current.disconnect();

			if (data[dataArrayProperty].length >= limit * (offset + 1)) {
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting) {
						setOffset((prev) => prev + 1);
					}
				});

				if (node) observer.current.observe(node);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[loading, data]
	);

	return {
		data,
		setData,
		loading,
		setOffset,
		newSearch: search !== previousSearch.current && offset === 0,
		setSearch,
		lastItemToObserve,
	};
};

export default useFetchInfiniteData;
