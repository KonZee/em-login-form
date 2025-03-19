import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./assets/components/Login";
import Welcome from "./assets/components/Welcome";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/welcome" element={<Welcome />} />
		</Routes>
	);
}

export default App;
