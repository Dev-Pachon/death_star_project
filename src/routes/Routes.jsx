import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useSelector } from "react-redux"
import Layout from "../components/Layout.jsx"
import HomePage from "../pages/Home.jsx"
import SignIn from '../pages/SignIn.jsx'
import SignUp from "../pages/SignUp.jsx"
import Starships from "../pages/Starships.jsx"
import Starship from '../pages/Starship.jsx'
import People from '../pages/People.jsx'
import Person from '../pages/Person.jsx'
import Planets from '../pages/Planets.jsx'
import Planet from '../pages/Planet.jsx'

export default function RoutesComponent() {

	const loggedIn = useSelector(state => state.auth.value)

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <HomePage />
				},
				{
					path: "/login",
					element: loggedIn ? <HomePage /> : <SignIn />
				},
				{
					path: "/signup",
					element: loggedIn ? <HomePage /> : <SignUp />
				},
				{
					path: "/starships",
					element: loggedIn ? <Starships /> : <SignIn />
				},
				{
					path: "/starships/:id",
					element: loggedIn ? <Starship /> : <SignIn />
				},
				{
					path: "/people",
					element: loggedIn ? <People /> : <SignIn />
				},
				{
					path: "/people/:id",
					element: loggedIn ? <Person /> : <SignIn />
				},
				{
					path: "/planets",
					element: loggedIn ? <Planets /> : <SignIn />
				},
				{
					path: "/planets/:id",
					element: loggedIn ? <Planet /> : <SignIn />
				}
			]
		}
	])

	return (
		<RouterProvider router={router} />
	)
}
