import PlaylistsSection from "components/Organisms/PlaylistsSection/PlaylistsSection";
import useCheckUser from "hooks/useCheckUser";
import { useSelector } from "react-redux";

const UserPlaylists = () => {
	useCheckUser();
	const user = useSelector((state) => state.user.value);

	return (
		<PlaylistsSection
			title={user && `${user.username} playlists`}
			endpoint="/playlists/get-user-playlists"
		/>
	);
};

export default UserPlaylists;
