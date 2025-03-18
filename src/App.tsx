import "./App.css";

function App() {
	return (
		<div className="form">
			<div className="fieldContainer">
				<input
					id="emailInput"
					className="input"
					aria-label="Input Email"
					type="email"
					placeholder="Your email"
				/>
				<label htmlFor="emailInput" className="label">
					Email:
				</label>
			</div>
			<div className="fieldContainer">
				<input
					id="passwordInput"
					className="input"
					aria-label="Input Password"
					type="password"
					placeholder="Your password"
				/>
				<label htmlFor="passwordInput" className="label">
					Password:
				</label>
			</div>

			<button type="submit" className="button">
				Login
			</button>
		</div>
	);
}

export default App;
