import {Link, Outlet} from "react-router-dom";
import React, {useState} from "react";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectLoggedIn, selectUser} from "../reducers/authSlice.js";

export default function Layout() {
	const user = useSelector((state)=>state.value)
	const loggedIn = useSelector(selectLoggedIn)
	const dispatch = useDispatch()
	const [userState, setUser] = useState({email:"testing@correo.com", password:"testing"})

	const handleLogin = () => {
		dispatch(login(userState))
		console.log(user)
	};

	const handleLogout = () => {
		dispatch(logout())
	};

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" sx={{flexGrow: 1}}>
						Death Star
					</Typography>
					{loggedIn ? (<>
							<Link to={"/starships"}>
								<Button variant={"outlined"} color="secondary">Spaceships</Button>
							</Link>
							<Link to={"/people"}>
								<Button color="secondary">People</Button>
							</Link>
							<Link to={"/planets"}>
								<Button color="secondary">Planets</Button>
							</Link>
							<Button color="secondary" onClick={handleLogout}>
								Logout
							</Button>
						</>
					) : (
						<Button color="inherit" onClick={handleLogin}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<div style={{padding: "16px"}}>
				<Outlet/>
			</div>
		</div>
	);
}