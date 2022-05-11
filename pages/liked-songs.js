import SectionSongs from "components/Organisms/SectionSongs/SectionSongs";
import getJwt from "helpers/getJwt";
import useCheckUser from "hooks/useCheckUser";

const LikedSongs = () => {
	useCheckUser();
	const token = getJwt();

	return (
		<SectionSongs
			endpoint="/users/get-liked-tracks/"
			token={token}
			title="Liked Songs"
		/>
	);
};

export default LikedSongs;
