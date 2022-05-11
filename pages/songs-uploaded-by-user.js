import SectionSongs from "components/Organisms/SectionSongs/SectionSongs";
import getJwt from "helpers/getJwt";
import useCheckUser from "hooks/useCheckUser";
import { useSelector } from "react-redux";

const SongsUploadedByUser = () => {
	useCheckUser();
	const token = getJwt();
	const user = useSelector((state) => state.user.value);

	return (
		<SectionSongs
			endpoint="/users/get-uploaded-tracks/"
			token={token}
			title={user && `Songs uploaded by ${user.username}`}
		/>
	);
};

export default SongsUploadedByUser;
