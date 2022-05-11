import PlaylistItemInModal from "components/Atoms/PlaylistItemInModal/PlaylistItemInModal";
import useGetRequest from "hooks/useGetRequest";
import styles from "./AddSongToPlaylist.module.scss";
import { addSongToPlaylistHandler } from "./AddSongToPlaylistLogic";
import { useToast } from "@chakra-ui/react";
import LoadingSpinner from "components/Atoms/LoadingSpinner/LoadingSpinner";

const AddSongToPlaylist = ({ trackId }) => {
	const token = localStorage.getItem("musicverse_jwt");
	const toast = useToast();
	const { data, loading } = useGetRequest(
		`${process.env.NEXT_PUBLIC_API_URL}/playlists/get-user-playlists`,
		token
	);

	return (
		<div
			className={`${styles.container} absolute-element center xxs-f-column xxs-gy-1`}
		>
			<h3 className="t3 c-white text-center">Add to Playlist</h3>

			{/* Se ejecuta cuando el usuario tiene playlists creadas */}
			{data &&
				!loading &&
				data.playlists.length > 0 &&
				data.playlists.map((playlist) => (
					<PlaylistItemInModal
						key={playlist._id}
						cover={playlist?.cover?.url}
						name={playlist.name}
						addSongToPlaylistHandler={() =>
							addSongToPlaylistHandler(token, playlist._id, trackId, toast)
						}
					/>
				))}

			{data && !loading && data.playlists.length === 0 && (
				<p className="body c-white text-center">
					You don&apos;t have created playlists, please create one and try
					again.
				</p>
			)}

			{loading && (
				<div className="spinner-container">
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};

export default AddSongToPlaylist;
