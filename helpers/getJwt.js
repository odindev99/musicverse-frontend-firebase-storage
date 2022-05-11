export default function getJwt() {
	const jwt = localStorage.getItem("musicverse_jwt");
	return jwt;
}
