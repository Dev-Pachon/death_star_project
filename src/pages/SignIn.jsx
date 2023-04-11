import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../util/firebase.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux';
import { login } from "../reducers/authSlice.js";
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignIn() {
	const MySwal = withReactContent(Swal)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget)
		signInWithEmailAndPassword(firebaseAuth, data.get('email'), data.get('password'))
			.then((response) => {
				dispatch(login({ uid: response.user.uid, email: response.user.email }))
				navigate('/')
			}).catch(() => {
				MySwal.fire({
					icon: 'error',
					title: 'Failed to login',
					text: 'Please check your credentials',
					confirmButtonText: 'Try again'
				})
			})
	}

	return (
		<>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 2, mb: 2 }}
					>
						Sign In
					</Button>
					<Typography align='center'>
						<Link component={RouterLink} to="/signup" variant="body2">
							Don't have an account? Sign Up
						</Link>
					</Typography>
				</Box>
			</Box>
		</>
	);
}