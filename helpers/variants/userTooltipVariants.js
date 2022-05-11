const variants = {
	initial: {
    // 205 es el width del container del tooltip
		x: 205,
	},
	animate: {
		x: 0,
		transition: {
			ease: "easeOut",
			duration: 0.7,
		},
	},
	exit: {
		x: 205,
		transition: {
			ease: "easeIn",
			duration: 0.7,
		},
	},
};

export default variants;
