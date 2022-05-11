const fadeVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,

		transition: {
			ease: "easeOut",
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,

		transition: {
			ease: "easeIn",
			duration: 0.5,
		},
	},
};

export default fadeVariants;
