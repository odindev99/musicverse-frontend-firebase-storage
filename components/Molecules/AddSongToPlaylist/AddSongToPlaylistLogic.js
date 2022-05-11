import nprogress from "nprogress";

export const addSongToPlaylistHandler = async (
	token,
	playlistId,
	trackId,
	toast
) => {
	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/playlists/add-track/`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				playlistId,
				trackId,
			}),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		return toast({
			title: data.message || "Success adding song to playlist!",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
	}

  return toast({
		title: data.message || "Failed adding song to playlist!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
