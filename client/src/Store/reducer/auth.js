import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT
} from "../actions/actionTypes";

const initState = {
	user: {
		id: null,
		name: null,
		email: null
	},
	token: null,
	loading: false,
	loginError: null,
	signupError: null
};

const authStart = (state, action) => {
	return {
		...state,
		token: null,
		loginError: null,
		signupError: null,
		loading: true
	};
};

const authSuccess = (state, { data }) => {
	return {
		...state,
		user: {
			id: data.user.id,
			name: data.user.name,
			email: data.user.email
		},
		token: data.token,
		loading: false,
		loginError: null,
		signupError: null
	};
};

const authFail = (state, { loginError, signupError }) => {
	return {
		...state,
		token: null,
		loading: false,
		loginError,
		signupError
	};
};

const authLogout = (state, action) => {
	return {
		...state,
		user: {},
		token: null,
		loading: false,
		loginError: null,
		signupError: null
	};
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case AUTH_START:
			return authStart(state, action);
		case AUTH_SUCCESS:
			return authSuccess(state, action);
		case AUTH_FAIL:
			return authFail(state, action);
		case AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};

export default reducer;
