import {Route, Routes, BrowserRouter as Router, RouterProvider, createBrowserRouter} from 'react-router-dom'
import SignIn from '../pages/SignIn.jsx'
import Layout from "../components/Layout.jsx";
import SignUp from "../pages/SignUp.jsx";
import HomePage from "../pages/Home.jsx";

export default function RoutesComponent() {

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
					element: <SignIn/>
				},
				{
					path: "/signup",
					element: <SignUp/>
				},
				{
					path: "/starships",
					element: <SignIn/>
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
