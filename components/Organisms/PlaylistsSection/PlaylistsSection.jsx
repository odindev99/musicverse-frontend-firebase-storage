import styles from "./PlaylistsSection.module.scss";
import PlaylistItem from "components/Atoms/PlaylistItem/PlaylistItem";
import FormCreatePlaylist from "components/Molecules/FormCreatePlaylist/FormCreatePlaylist";
import { AnimatePresence } from "framer-motion";
import { useModal } from "hooks/useModal";
import Modal from "../Modal/Modal";
import Link from "next/link";
import SearchBar from "components/Atoms/SearchBar/SearchBar";
import useFetchInfiniteData from "hooks/useFetchInfiniteData";
import getJwt from "helpers/getJwt";
import LoadingSpinner from "components/Atoms/LoadingSpinner/LoadingSpinner";

const PlaylistsSection = ({ title, endpoint }) => {
	const token = getJwt();
	const [isOpenModal, openModal, closeModal] = useModal();

	const limit = 20;
	const {
		data,
		setData,
		loading,
		setSearch,
		newSearch,
		setOffset,
		lastItemToObserve,
	} = useFetchInfiniteData(
		endpoint,
		limit,
		token,
		"playlists"
	);

	return (
		<section className="max-width xxs-py-40">
			<div className="xxs-f-column s-f-row xxs-g-1">
				<h3 className="t3 c-white">{title}</h3>
				<button className="button" onClick={openModal}>
					New Playlists
				</button>
			</div>

			<SearchBar setSearch={setSearch} setOffset={setOffset} />

			{loading && newSearch && (
				<div className="xxs-f-main-center xxs-mt-40">
					<LoadingSpinner />
				</div>
			)}

			<h5 className="t5 c-white xxs-mt-30">
				{data?.userPlaylistsQuantity && data.userPlaylistsQuantity} Playlists
			</h5>

			<div className={`xxs-mt-30 ${styles.playlists_container}`}>
				{data?.playlists &&
					data.playlists.map((playlist, index) => (
						<Link key={playlist._id} href={`/playlists/${playlist._id}/`}>
							<a
								ref={
									data.playlists.length === index + 1
										? lastItemToObserve
										: undefined
								}
							>
								<PlaylistItem cover={playlist.cover} name={playlist.name} />
							</a>
						</Link>
					))}
			</div>

			{loading && !newSearch && (
				<div className="spinner-container">
					<LoadingSpinner />
				</div>
			)}

			<AnimatePresence>
				{isOpenModal && (
					<Modal closeModal={closeModal}>
						<FormCreatePlaylist setData={setData} />
					</Modal>
				)}
			</AnimatePresence>
		</section>
	);
};

export default PlaylistsSection;
