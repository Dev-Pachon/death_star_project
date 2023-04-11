import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../util/firebase.js";
import { useDispatch } from 'react-redux';
import { login } from "../reducers/authSlice.js";
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignUp() {
	const MySwal = withReactContent(Swal)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		createUserWithEmailAndPassword(firebaseAuth, data.get('email'), data.get('password'))
			.then((response) => {
				dispatch(login({ uid: response.user.uid, email: response.user.email }))
				navigate('/')
			})
			.catch(() => {
				MySwal.fire({
					icon: 'error',
					title: 'Failed to sign up',
					text: 'Please check your information',
					confirmButtonText: 'Try again'
				})
			})
	};

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
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Typography align='center'>
						<Link component={RouterLink} to="/login" variant="body2">
							Already have an account? Sign in
						</Link>
					</Typography>
				</Box>
			</Box>
		</>
	);
}