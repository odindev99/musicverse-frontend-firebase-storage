import PlaylistsSection from "components/Organisms/PlaylistsSection/PlaylistsSection";

const Playlists = () => {
	return (
		<PlaylistsSection
			title={`Playlists`}
			endpoint="/playlists/get-playlists"
		/>
	);
};

export default Playlists;
