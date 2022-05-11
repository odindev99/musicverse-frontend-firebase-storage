import styles from "./MusicPlayerV2.module.scss";
import {
	formatAudioTimer,
	playHandler,
	pauseHandler,
	setVolume,
	setCurrentTime,
	showVolumeControlHandler,
	deleteTrackHandler,
	likedTrackHandler,
	removeTrackFromPlaylist,
} from "./MusicPlayerV2Logic";
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	MenuItem,
	useToast,
} from "@chakra-ui/react";
import useMusicPlayer from "hooks/useMusicPlayer";
import Image from "next/image";
import { menuItemDefault, menuItemDelete } from "helpers/chakraUiCustomStyles";
import PauseIcon from "../../Atoms/PauseIcon/PauseIcon";
import PlayIcon from "../../Atoms/PlayIcon/PlayIcon";
import SoundIcon from "../../Atoms/SoundIcon/SoundIcon";
import HeartIcon from "../../Atoms/HeartIcon/HeartIcon";
import DotsIcon from "components/Atoms/DotsIcon/DotsIcon";

const MusicPlayerV2 = ({
	audio,
	track,
	token,
	setData,
	userId,
	innerRef,
	playlistsActions,
	shouldShowRemoveFromPlaylist,
}) => {
	const {
		isPlaying,
		setIsPlaying,
		audioData,
		setAudioData,
		showVolumeControl,
		setShowVolumeControl,
		showPlayIcon,
		setShowPlayIcon,
	} = useMusicPlayer(
		audio,
		track.url
	);
	const toast = useToast();

	return (
		<div
			className={`${styles.music_player} xxs-f-column xxs-f-center-xy`}
			ref={innerRef}
		>
			<div className={`${styles.cover_container}`}>
				<Image
					src={
						track?.cover
							? track.cover
							: `${process.env.NEXT_PUBLIC_API_URL}/general_cover.jpg`
					}
					alt="Cover"
					width={120}
					height={120}
				/>
			</div>

			<div className="xxs-py-10">
				<h5 className="t5 c-white text-center">{track?.name}</h5>
				<p className="body c-white text-center">{track?.artist}</p>
				<p className="body c-white text-center">
					{formatAudioTimer(audioData.currentTime)} /{" "}
					{formatAudioTimer(audioData.duration)}
				</p>
			</div>

			{(showPlayIcon || !isPlaying) && (
				<PlayIcon
					playHandler={() =>
						playHandler(
							audio,
							track.url,
							setIsPlaying,
							setShowPlayIcon
						)
					}
				/>
			)}

			{!showPlayIcon && isPlaying && (
				<PauseIcon pauseHandler={() => pauseHandler(audio, setShowPlayIcon)} />
			)}

			{/* duration range */}
			<div
				className={`all-width  xxs-mt-10 xxs-px-30 ${styles.duration_range_container}`}
			>
				<Slider
					aria-label="duration"
					min="0"
					max={audioData.duration}
					step={0.01}
					value={audioData.currentTime ? audioData.currentTime : 0}
					onChange={(value) => setCurrentTime(value, audio, setAudioData)}
					focusThumbOnChange={false}
				>
					<SliderTrack>
						<SliderFilledTrack bg="#6d00ff" />
					</SliderTrack>
					<SliderThumb />
				</Slider>
			</div>

			<div className="xxs-f-column all-width xxs-mt-10 xxs-px-10 relative-element">
				{/* volume range */}
				{showVolumeControl && (
					<div className={`${styles.volume_range_container}`}>
						<Slider
							aria-label="duration"
							min="0"
							max="1"
							step={0.01}
							defaultValue={1}
							onChange={(value) => setVolume(value, audio)}
							focusThumbOnChange={false}
							orientation="vertical"
							minHeight={100}
						>
							<SliderTrack>
								<SliderFilledTrack bg="#6d00ff" />
							</SliderTrack>
							<SliderThumb />
						</Slider>
					</div>
				)}
				<div className="xxs-f-main-justify ">
					<button
						onClick={() => showVolumeControlHandler(setShowVolumeControl)}
					>
						<SoundIcon />
					</button>

					{userId && (
						<button
							onClick={() =>
								likedTrackHandler(
									token,
									track._id,
									track.isLikedByLoggedUser,
									toast,
									setData
								)
							}
						>
							<HeartIcon liked={track.isLikedByLoggedUser} />
						</button>
					)}

					<Menu>
						<MenuButton
							icon={<DotsIcon />}
							as={IconButton}
							aria-label="Options"
							variant="unstyled"
							size="xs"
						/>
						<MenuList bg="#2a2a2a" borderColor="#4d4d4d">
							<a
								href={`${process.env.NEXT_PUBLIC_API_URL}/tracks/${track._id}/download`}
								download
							>
								<MenuItem {...menuItemDefault}>Download</MenuItem>
							</a>

							{userId && (
								<MenuItem
									{...menuItemDefault}
									onClick={() => {
										playlistsActions.setSelectedTrack(track._id);
										return playlistsActions.openPlaylistsModal();
									}}
								>
									Add to playlist
								</MenuItem>
							)}

							{shouldShowRemoveFromPlaylist && (
								<MenuItem
									{...menuItemDelete}
									onClick={() =>
										removeTrackFromPlaylist(
											playlistsActions.getPlaylistId,
											track._id,
											token,
											setData,
											toast
										)
									}
								>
									Remove from playlist
								</MenuItem>
							)}

							{track.uploadedByUser === userId && (
								<MenuItem
									{...menuItemDelete}
									onClick={() =>
										deleteTrackHandler(token, track._id, setData, toast)
									}
								>
									Delete
								</MenuItem>
							)}
						</MenuList>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default MusicPlayerV2;
