import dayjs from "dayjs";
import nprogress from "nprogress";

export const formatAudioTimer = (time) =>
	!time ? "0:00" : dayjs(time * 1000).format("m:ss");

export const playHandler = (audio, src, setIsPlaying, setShowPlayIcon) => {
	if (audio.current.src !== src) {
		audio.current.src = src;
	}
	audio.current.play();
	setIsPlaying(true);
	setShowPlayIcon(false);
};

export const pauseHandler = (audio, setShowPlayIcon) => {
	audio.current.pause();
	setShowPlayIcon(true);
	// setIsPlaying(false);
};

export const setVolume = (value, audio) => {
	audio.current.volume = value;
};

// Track forward and rewind handler
export const setCurrentTime = (value, audio, setAudioData) => {
	if (value) {
		audio.current.currentTime = value;
		return setAudioData((prev) => ({ ...prev, currentTime: value }));
	}

	return;
};

// Playing tracks handler
export const timeUpdateHandler = (audio, src, setAudioData, setIsPlaying) => {
	if (audio.current.src !== src) {
		setAudioData({});
		setIsPlaying(false);
	}

	setAudioData((prev) => ({
		...prev,
		duration: audio.current.duration,
		currentTime: audio.current.currentTime,
	}));

	if (audio.current.ended) {
		setIsPlaying(false);
	}
};

// Volume control handler
export const showVolumeControlHandler = (setShowVolumeControl) => {
	setShowVolumeControl((prev) => !prev);
};

// Handler to delete tracks
export const deleteTrackHandler = async (token, trackId, setData, toast) => {
	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/tracks/delete`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ id: trackId }),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		setData((prevData) => {
			const prevDataCopy = { ...prevData };
			prevDataCopy.tracks = prevData.tracks.filter(
				(track) => track._id !== trackId
			);
			return prevDataCopy;
		});

		return toast({
			title: "Track deleted",
			position: "top-right",
			isClosable: true,
			status: "success",
		});
	}

	return toast({
		title: data.message || "Error deleting the track, please try again",
		position: "top-right",
		isClosable: true,
		status: "error",
	});
};

export const likedTrackHandler = async (
	token,
	trackId,
	liked,
	toast,
	setData
) => {
	nprogress.start();

	let response;

	if (!liked) {
		response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/users/set-liked-track`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ trackId }),
			}
		);
	} else {
		response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/users/remove-liked-track`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ trackId }),
			}
		);
	}

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		setData((prevData) => {
			const prevDataCopy = { ...prevData };
			const targetTrackIndex = prevDataCopy.tracks.findIndex(
				(track) => track._id === trackId
			);
			prevDataCopy.tracks[targetTrackIndex].isLikedByLoggedUser = !liked;

			return prevDataCopy;
		});
		return toast({
			title: data.message,
			position: "top-right",
			isClosable: true,
			status: "success",
		});
	}

	return toast({
		title: data.message,
		position: "top-right",
		isClosable: true,
		status: "error",
	});
};

export const removeTrackFromPlaylist = async (
	playlistId,
	trackId,
	token,
	setData,
	toast
) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/playlists/remove-track`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ trackId, playlistId }),
		}
	);

	const data = await response.json();

	if (response.ok) {
		setData((prevData) => {
			const prevDataCopy = { ...prevData };
			prevDataCopy.tracks = prevData.tracks.filter(
				(track) => track._id !== trackId
			);
			return prevDataCopy;
		});
		return toast({
			title: "Track removed from playlist successfully",
			position: "top-right",
			isClosable: true,
			status: "success",
		});
	}

	return toast({
		title: data.message || "Error removing track from playlist ",
		position: "top-right",
		isClosable: true,
		status: "error",
	});
};
