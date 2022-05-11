import styles from "./SectionSongs.module.scss";
import MusicPlayerV2 from "../MusicPlayerV2/MusicPlayerV2";
import { useSelector } from "react-redux";
import { useModal } from "hooks/useModal";
import { AnimatePresence } from "framer-motion";
import Modal from "components/Organisms/Modal/Modal";
import AddSongToPlaylist from "../../Molecules/AddSongToPlaylist/AddSongToPlaylist";
import { useRef } from "react";
import AddSongButton from "components/Atoms/AddSongButton/AddSongButton";
import AddSongForm from "components/Atoms/AddSongForm/AddSongForm";
import SearchBar from "components/Atoms/SearchBar/SearchBar";
import useFetchInfiniteData from "hooks/useFetchInfiniteData";
import LoadingSpinner from "components/Atoms/LoadingSpinner/LoadingSpinner";

const SectionSongs = ({ endpoint, token, title }) => {
	const user = useSelector((state) => state.user.value);
	const [isOpenPlaylistsModal, openPlaylistsModal, closePlaylistsModal] =
		useModal();
	const [isOpenAddSongModal, openAddSongModal, closeAddSongModal] = useModal();
	const audio = useRef();
	const selectedTrackId = useRef();

	const limit = 12;
	const {
		data,
		setData,
		loading,
		setSearch,
		setOffset,
		newSearch,
		lastItemToObserve,
	} = useFetchInfiniteData(endpoint, limit, token, "tracks");

	return (
		<div className="max-width-songs-section">
			<audio preload="none" ref={audio}></audio>

			{title && <h3 className="t3 c-white xxs-mt-40">{title}</h3>}

			<button
				className={`${styles.mobile_button} button xxs-mt-40`}
				onClick={openAddSongModal}
			>
				Add new song
			</button>

			<SearchBar setSearch={setSearch} setOffset={setOffset} />

			{loading && newSearch && (
				<div className="xxs-f-main-center xxs-mt-40">
					<LoadingSpinner />
				</div>
			)}

			<section className={` player-grid xxs-mt-40 xxs-pb-40 `}>
				{data?.tracks &&
					data.tracks.map((track, index) => (
						<MusicPlayerV2
							key={track._id}
							audio={audio}
							track={track}
							userId={user?.userId}
							setData={setData}
							token={token}
							playlistsActions={{
								openPlaylistsModal,
								setSelectedTrack: (trackId) =>
									(selectedTrackId.current = trackId),
							}}
							innerRef={
								data.tracks.length === index + 1 ? lastItemToObserve : undefined
							}
						/>
					))}

				{user && <AddSongButton clickHandler={openAddSongModal} />}

				<AnimatePresence>
					{isOpenPlaylistsModal && (
						<Modal closeModal={closePlaylistsModal}>
							<AddSongToPlaylist trackId={selectedTrackId.current} />
						</Modal>
					)}
					{isOpenAddSongModal && (
						<Modal closeModal={closeAddSongModal}>
							{/* <AddSongForm mutate={mutate} /> */}
							<AddSongForm setData={setData} />
						</Modal>
					)}
				</AnimatePresence>
			</section>

			{loading && !newSearch && (
				<div className="spinner-container">
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};

export default SectionSongs;
