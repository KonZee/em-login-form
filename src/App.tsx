import { useRef, useState } from "react";
import "./App.css";
import { type LoginError, mockLoginFetch } from "./fake-api";

// TODO
// 1. Add submit with fetch mock
// 2. Validation
// 3. Loading state for API response
// 4. Image
// 5. Icons
// 6. Reveal Password buttons

function App() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		const data = await mockLoginFetch({
			email: emailRef.current?.value || "test@test1.com",
			password: passwordRef.current?.value || "12345",
		});

		console.log(data);
		const payload = await data.json();
		console.log(payload);

		if (data.ok) {
			// Proceed success
		} else {
			// Must be better, let it be as for now
			const error = (payload as LoginError).error;
			setEmailErrorMessage(error);
			setPasswordErrorMessage(error);
		}
		setLoading(false);
	}

	function handleEmailErrorReset() {
		setEmailErrorMessage("");
	}

	function handlePasswordEmailReset() {
		setPasswordErrorMessage("");
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="fieldContainer">
				<input
					ref={emailRef}
					id="emailInput"
					className="input"
					aria-label="Input Email"
					type="email"
					placeholder="Your email"
					onFocus={handleEmailErrorReset}
					onChange={handleEmailErrorReset}
				/>
				<label htmlFor="emailInput" className="label">
					Email:
				</label>
				<span className={`error ${emailErrorMessage ? "" : "hiddenError"}`}>
					{emailErrorMessage}
				</span>
			</div>
			<div className="fieldContainer">
				<input
					ref={passwordRef}
					id="passwordInput"
					className="input"
					aria-label="Input Password"
					type="password"
					placeholder="Your password"
					onFocus={handlePasswordEmailReset}
					onChange={handlePasswordEmailReset}
				/>
				<label htmlFor="passwordInput" className="label">
					Password:
				</label>
				<span className={`error ${passwordErrorMessage ? "" : "hiddenError"}`}>
					{passwordErrorMessage}
				</span>
			</div>

			<button type="submit" className="button" disabled={loading}>
				Login
			</button>
		</form>
	);
}

export default App;
