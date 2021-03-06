import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import grey from "@material-ui/core/colors/grey";

// components
import reducer from "../../Store/reducer/index";
import Routes from "../Routes/Routes";

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const REDUCER = combineReducers(reducer);

const STORE = createStore(
	REDUCER,
	composeEnhancers(applyMiddleware(thunk /*Add Middleware*/))
);

const THEME = createMuiTheme({
	// shadows: Array(25),
	overrides: {
		MuiButton: {
			raised: {
				boxShadow: "none"
			}
		},
		MuiAppBar: {
			root: {
				boxShadow: "none"
			}
		}
	},
	palette: {
		primary: {
			main: grey[900]
		},
		secondary: {
			main: grey[700]
		}
	}
});

const APP = (
	<Provider store={STORE}>
		<BrowserRouter>
			<Fragment>
				<MuiThemeProvider theme={THEME}>
					<CssBaseline />
					<Routes />
				</MuiThemeProvider>
			</Fragment>
		</BrowserRouter>
	</Provider>
);

export default APP;
