const PauseIcon = ({pauseHandler}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="35"
			height="35"
			viewBox="0 0 24 24"
			onClick={pauseHandler}
			fill="white"
		>
			<path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" />
		</svg>
	);
};

export default PauseIcon;