import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice.js";
import { signOut } from "firebase/auth"
import { firebaseAuth } from "../util/firebase.js";
import Copyright from "./Copyright.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Layout() {
	const loggedIn = useSelector(state => state.auth.value)
	const dispatch = useDispatch()

	const handleLogout = () => {
		signOut(firebaseAuth)
			.then(() => {
				dispatch(logout())
			})
	};

	return (
		<div>
			<AppBar position="fixed">
				<Toolbar>
					<Typography color="white" sx={{ flexGrow: 1 }}>
						<Button color="inherit" variant="text" component={Link} to="/">Death Star</Button>
					</Typography>
					{loggedIn ? (<>
						<Button color="inherit" component={Link} to="/starships">Starships</Button>
						<Button color="inherit" component={Link} to="/people">People</Button>
						<Button color="inherit" component={Link} to="/planets">Planets</Button>
						<Button color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					</>
					) : (
						<Button color="inherit" component={Link} to="/login">
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xl" sx={{ pt: 10 }}>
					<Outlet />
				</Container>
				<Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
					<Copyright sx={{ pt: 5 }} />
				</Box>
			</ThemeProvider>
		</div>
	);
}