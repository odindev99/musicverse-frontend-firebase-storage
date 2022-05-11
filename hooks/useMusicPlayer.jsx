import { useState, useEffect } from "react";
import { timeUpdateHandler } from "components/Organisms/MusicPlayerV2/MusicPlayerV2Logic";

const useMusicPlayer = (audio, src) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [showPlayIcon, setShowPlayIcon] = useState(true); 
	const [audioData, setAudioData] = useState({});
	const [showVolumeControl, setShowVolumeControl] = useState(false);

	useEffect(() => {
		const audioElement = audio.current;

		const timeUpdateHandlerClosure = () => {
			timeUpdateHandler(audio, src, setAudioData, setIsPlaying);
		};

		if (isPlaying) {
			audioElement.addEventListener("timeupdate", timeUpdateHandlerClosure);

			return () =>
				audioElement.removeEventListener(
					"timeupdate",
					timeUpdateHandlerClosure
				);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlaying]);


	return {
		isPlaying,
		setIsPlaying,
		audioData,
		setAudioData,
		showVolumeControl,
		setShowVolumeControl,
		showPlayIcon, 
		setShowPlayIcon
	};
};

export default useMusicPlayer;
