import {Route, Routes, BrowserRouter as Router, RouterProvider, createBrowserRouter} from 'react-router-dom'
import { useSelector } from "react-redux";
import SignIn from '../pages/SignIn.jsx'
import Layout from "../components/Layout.jsx";
import SignUp from "../pages/SignUp.jsx";
import HomePage from "../pages/Home.jsx";
import Starships from "../pages/Starships.jsx";

export default function RoutesComponent() {

	const loggedIn = useSelector(state => state.auth.value)

	const router = createBrowserRouter([
		{
			path:"/",
			element: <Layout/>,
			children: [
				{
					path: "/",
					element: <HomePage/>
				},
				{
					path: "/login",
					element: loggedIn ? <HomePage/> : <SignIn/>
				},
				{
					path: "/signup",
					element: loggedIn ? <HomePage/> : <SignUp/>
				},
				{
					path: "/starships",
					element:  loggedIn ? <Starships/> : <SignIn/>
				},
				{
					path: "/starships/:id",
					element: <SignIn/>
				},
				{
					path: "/people",
					element: <SignIn/>
				},
				{
					path: "/people/:id",
					element: <SignIn/>
				},
				{
					path: "/planets",
					element: <SignIn/>
				},
				{
					path: "/planets/:id",
					element: <SignIn/>
				}
			]
		}
	])

	return (
		<RouterProvider router={router}/>
	)
}
