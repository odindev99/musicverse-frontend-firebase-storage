import SectionSongs from "components/Organisms/SectionSongs/SectionSongs";
import getJwt from "helpers/getJwt";

const Index = () => {
	const token = getJwt();

	return <SectionSongs endpoint="/tracks" token={token} title="All songs" />;
};

export default Index;
