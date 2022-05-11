const PlayIcon = ({ playHandler }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="35"
			height="35"
			viewBox="0 0 24 24"
			onClick={playHandler}
			fill="white"
		>
			<path d="M3 22v-20l18 10-18 10z" />
		</svg>
	);
};

export default PlayIcon;