import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import SignIn from '../pages/SignIn.jsx'
import Layout from "../components/Layout.jsx";
import SignUp from "../pages/SignUp.jsx";

export default function RoutesComponent() {
	return (
		<Router>
			<Routes>
				<Route element={<Layout/>}>
					<Route
						path="/"
						element={<SignIn/>}
					/>
					<Route
						path="/login"
						element={<SignIn/>}
					/>
					<Route
						path="/signup"
						element={<SignUp/>}
					/>
					<Route
						path="/starships"
						element={<SignIn/>}
					/>
					<Route
						path="/starships/:id"
						element={<SignIn/>}
					/>
					<Route
						path="/people"
						element={<SignIn/>}
					/>
					<Route
						path="/people/:id"
						element={<SignIn/>}
					/>
					<Route
						path="/planets"
						element={<SignIn/>}
					/>
					<Route
						path="/planets/:id"
						element={<SignIn/>}
					/>
				</Route>
			</Routes>
		</Router>
	)
}
