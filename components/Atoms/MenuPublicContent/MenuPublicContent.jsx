import Link from "next/link";

const MenuPublicContent = () => {
	return (
		<>
			<Link href="/signin">
				<a className="body c-white block-element">Sing In</a>
			</Link>
			<Link href="/login">
				<a className="body c-white">Log In</a>
			</Link>
			<Link href="/">
				<a className="body c-white block-element">All songs</a>
			</Link>
			<Link href="/playlists">
				<a className="body c-white block-element">All playlists</a>
			</Link>
		</>
	);
};

export default MenuPublicContent;
