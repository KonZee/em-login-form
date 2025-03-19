import { NavLink } from "react-router-dom";

function Welcome() {
	return (
		<div style={{ textAlign: "center" }}>
			<div>Welcome, Username</div>
			<NavLink to="/">Back to Login</NavLink>
		</div>
	);
}

export default Welcome;
