const PlaylistIcon = () => {
  return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<circle cx={14} cy={17} r={3}></circle>
			<path d="M17 17v-13h4"></path>
			<path d="M13 5h-10"></path>
			<line x1={3} y1={9} x2={13} y2={9}></line>
			<path d="M9 13h-6"></path>
		</svg>
	);
}

export default PlaylistIcon;