import nprogress from "nprogress";

export const deleteHandler = async (playlistId, token, toast, router) => {
  nprogress.start();

  const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/playlists/delete/${playlistId}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

  const data = await response.json();

  nprogress.done();

  if(response.ok) {
    toast({
			title: data.message || "Success deleting playlist!",
			status: "success",
			position: "top-right",
			isClosable: true,
		});

    return router.push('/playlists')
  }

  return toast({
		title: data.message || "Failed deleting playlist, please try again!",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
}