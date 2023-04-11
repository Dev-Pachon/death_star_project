import {createSlice} from "@reduxjs/toolkit";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth"
import {firebaseAuth} from "../util/firebase.js";

const initialState = {
	value: {}
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			signInWithEmailAndPassword(firebaseAuth, action.payload.email, action.payload.password)
				.then((userCredential) => {
					state.value = userCredential.user
				}).catch((err) => {
				const errCod = err.code
				const errMsg = err.message
				console.error(errMsg)
			})
		},
		logout: (state) => {
			signOut(firebaseAuth).then(() => {
				state.user = {}
				state.loggedIn = true
			}).catch((err) => {
				const errCod = err.code
				const errMsg = err.message
				console.error(errMsg)
			})
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

export const selectUser = (state) => state.auth.value
export const selectLoggedIn = (state) => state.auth.loggedIn

export const {login, logout, signup} = authSlice.actions
export default authSlice.reducer