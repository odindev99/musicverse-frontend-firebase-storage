import PlaylistHeader from "components/Molecules/PlaylistHeader/PlaylistHeader";
import PlaylistSongsSection from "components/Molecules/PlaylistSongsSection/PlaylistSongsSection";
import { useRouter } from "next/router";
import { useModal } from "hooks/useModal";
import { AnimatePresence } from "framer-motion";
import Modal from "components/Organisms/Modal/Modal";
import UpdatePlaylist from "components/Atoms/UpdatePlaylist/UpdatePlaylist";
import getJwt from "helpers/getJwt";
import useFetchInfiniteData from "hooks/useFetchInfiniteData";
import { useSelector } from "react-redux";
import LoadingSpinner from "components/Atoms/LoadingSpinner/LoadingSpinner";

const Playlist = () => {
	const token = getJwt();
	const router = useRouter();
	const { id: playlistId } = router.query;
	const [isOpenModal, openModal, closeModal] = useModal();
	const user = useSelector((state) => state.user.value);

	const limit = 12;

	const playlistData = useFetchInfiniteData(
		`/playlists/get-playlist-details/${playlistId}`,
		limit,
		token,
		"tracks"
	);

	const { data, loading, setData } = playlistData;

	return (
		<>
			<section className="max-width">
				{data?.playlistDetails && (
					<>
						<PlaylistHeader
							playlistData={playlistData}
							router={router}
							openModal={openModal}
							user={user}
							token={token}
						/>

						<PlaylistSongsSection playlistData={playlistData} user={user} />
					</>
				)}

				<AnimatePresence>
					{isOpenModal && (
						<Modal closeModal={closeModal}>
							<UpdatePlaylist
								playlistId={playlistId}
								closeModal={closeModal}
								setData={setData}
							/>
						</Modal>
					)}
				</AnimatePresence>
			</section>

			{loading && !data?.tracks && (
				<div className="spinner-container">
					<LoadingSpinner />
				</div>
			)}
		</>
	);
};

export default Playlist;
