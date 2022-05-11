import { extendTheme } from "@chakra-ui/react";
import scssVars from "styles/_variables.module.scss";

export const theme = extendTheme({
	colors: {
		purple: {
			600: scssVars.vibrantColor,
		},
	},
});

export const menuItemDefault = {
	color: "white",
	_focus: {
		bg: scssVars.mainColor,
	},
	_active: {
		bg: scssVars.mainColor,
	},
};

export const menuItemDelete = {
	color: "white",
	_focus: {
		bg: scssVars.redColor,
	},
	_active: {
		bg: scssVars.redColor,
	},
};
