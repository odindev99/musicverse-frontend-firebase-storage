import MusicPlayerV2 from "../../Organisms/MusicPlayerV2/MusicPlayerV2";
import Modal from "components/Organisms/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import { useModal } from "hooks/useModal";
import AddSongToPlaylist from "../AddSongToPlaylist/AddSongToPlaylist";
import { useRef } from "react";
import getJwt from "helpers/getJwt";
import LoadingSpinner from "components/Atoms/LoadingSpinner/LoadingSpinner";
import SearchBar from "components/Atoms/SearchBar/SearchBar";

const PlaylistSongsSection = ({ playlistData, user }) => {
	const token = getJwt();
	const [isOpenModal, openModal, closeModal] = useModal();
	const audio = useRef();
	const selectedTrackId = useRef();

	const {
		data,
		loading,
		setData,
		setSearch,
		setOffset,
		newSearch,
		lastItemToObserve,
	} = playlistData;

	return (
		<>
			<audio preload="none" ref={audio}></audio>

			<SearchBar setSearch={setSearch} setOffset={setOffset} />

			{loading && newSearch && (
				<div className="xxs-f-main-center xxs-mt-40">
					<LoadingSpinner />
				</div>
			)}

			<section className={`player-grid xxs-mt-40 xxs-pb-40 `}>
				{data?.tracks &&
					data.tracks.map((track, index) => {
						return (
							<MusicPlayerV2
								key={track._id}
								audio={audio}
								track={track}
								userId={user?.userId}
								setData={setData}
								token={token}
								playlistsActions={{
									openPlaylistsModal: openModal,
									setSelectedTrack: (trackId) =>
										(selectedTrackId.current = trackId),
									getPlaylistId: data.playlistDetails._id,
								}}
								innerRef={
									data.tracks.length === index + 1
										? lastItemToObserve
										: undefined
								}
								shouldShowRemoveFromPlaylist={
									user && user.userId === data.playlistDetails.createdByUser
								}
							/>
						);
					})}

				<AnimatePresence>
					{isOpenModal && (
						<Modal closeModal={closeModal}>
							<AddSongToPlaylist trackId={selectedTrackId.current} />
						</Modal>
					)}
				</AnimatePresence>
			</section>

			{loading && !newSearch && (
				<div className="spinner-container">
					<LoadingSpinner />
				</div>
			)}
		</>
	);
};

export default PlaylistSongsSection;
