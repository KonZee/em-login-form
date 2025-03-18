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

// Let's do validation without library - this is email validation regex according IETF RFC 5322 standard
// Practically better to use zod or other validation lib
const emailRegex =
	// biome-ignore lint/correctness/noEmptyCharacterClassInRegex: <explanation>
	/([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/i;

function App() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		let emailIsInvalid = false;
		let passwordIsInvalid = false;

		const emailValue = emailRef.current?.value;
		const passwordValue = passwordRef.current?.value;
		const emailIsValid = emailValue && emailRegex.test(emailValue);

		if (!emailValue?.length) {
			setEmailErrorMessage("Email is required");
		} else if (!emailIsValid) {
			setEmailErrorMessage("Email is not valid");
			emailIsInvalid = true;
		}

		if (!passwordValue?.length) {
			setPasswordErrorMessage("Password is required");
			passwordIsInvalid = true;
		}

		if (emailIsInvalid || passwordIsInvalid) {
			return;
		}

		setLoading(true);
		const data = await mockLoginFetch({
			email: emailRef.current?.value || "",
			password: passwordRef.current?.value || "",
		});

		const payload = await data.json();
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
					// Use text instead of email to handle validation errors in the same way as others, not by browser
					type="text"
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
