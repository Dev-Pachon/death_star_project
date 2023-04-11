import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../util/firebase.js";

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		value: false,
	},
	reducers: {
		login: (state, action) => {
			state.value = {
				email: action.payload.email,
				uid: action.payload.uid
			}
		},
		logout: state => {
			state.value = false
		},
		signup: (state, action) => {
			createUserWithEmailAndPassword(firebaseAuth, action.payload.email, action.payload.password)
				.then((userCredential) => {
					state = userCredential.user;
				})
				.catch((err) => {
					const errCod = err.code
					const errMsg = err.message
					console.error(errMsg)
				})
		}
	}
})

//export const selectUser = (state) => state.auth.value
//export const selectLoggedIn = (state) => state.auth.loggedIn

export const { login, logout, signup } = authSlice.actions
export default authSlice.reducer