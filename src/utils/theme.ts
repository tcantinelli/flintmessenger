import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2BAACA",
			contrastText: "white"
		},
		secondary: {
			main: "#FF5760",
			contrastText: "white"
		}
	},
	typography: {
		fontFamily: "Comfortaa",
	  },
});

export default theme;