import { useState } from "react";
import "./App.css";
import IconEyeClosed from "./assets/icons/eye-closed.svg?react";
import IconEye from "./assets/icons/eye.svg?react";
import IconPassword from "./assets/icons/lock-password.svg?react";
import IconMail from "./assets/icons/mail.svg?react";
import IconRefresh from "./assets/icons/refresh.svg?react";
import {
	type LoginError,
	type LoginVariables,
	mockLoginFetch,
} from "./fake-api";

// Let's do validation without library - this is email validation regex according IETF RFC 5322 standard
// Practically better to use zod or other validation lib
const emailRegex =
	// biome-ignore lint/correctness/noEmptyCharacterClassInRegex: <explanation>
	/([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/i;

function App() {
	const [formValues, setFormValues] = useState<LoginVariables>({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
	const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		let emailIsInvalid = false;
		let passwordIsInvalid = false;

		const emailValue = formValues.email || "";
		const passwordValue = formValues.password || "";
		const emailIsValid = emailValue && emailRegex.test(emailValue);

		if (!emailValue.length) {
			setEmailErrorMessage("Email is required");
			emailIsInvalid = true;
		} else if (!emailIsValid) {
			setEmailErrorMessage("Email is not valid");
			emailIsInvalid = true;
		}

		if (!passwordValue.length) {
			setPasswordErrorMessage("Password is required");
			passwordIsInvalid = true;
		}

		if (emailIsInvalid || passwordIsInvalid) {
			return;
		}

		setLoading(true);
		const data = await mockLoginFetch({
			email: emailValue,
			password: passwordValue,
		});

		const payload = await data.json();
		if (data.ok) {
			// Proceed success:
			// Implement Router
			// Store token and logged user data somewhere (perhaps on the early stage)
		} else {
			// Must be better, let it be as for now
			const error = (payload as LoginError).error;
			setEmailErrorMessage(error);
			setPasswordErrorMessage(error);
		}
		setLoading(false);
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });
		handleResetInput(e);
	}

	function handleResetInput(e: React.ChangeEvent<HTMLInputElement>) {
		switch (e.target.id) {
			case "email":
				setEmailErrorMessage("");
				break;
			case "password":
				setPasswordErrorMessage("");
				break;
		}
	}

	function handleSwitchPasswordVisibility() {
		setPasswordVisibility(!isPasswordVisible);
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="fieldContainer">
				<IconMail className="icon" />
				<div className="field">
					<input
						id="email"
						className="input"
						aria-label="Input Email"
						// Use text instead of email to handle validation errors in the same way as others, not to trigger browser`s one
						type="text"
						placeholder="Your email"
						value={formValues.email}
						onFocus={handleResetInput}
						onChange={handleInputChange}
					/>
					<label htmlFor="email" className="label">
						Email:
					</label>
					<span className={`error ${emailErrorMessage ? "" : "hiddenError"}`}>
						{emailErrorMessage}
					</span>
				</div>
			</div>
			<div className="fieldContainer">
				<IconPassword className="icon" />
				<div className="field">
					<input
						id="password"
						className="input"
						aria-label="Input Password"
						type={isPasswordVisible ? "text" : "password"}
						placeholder="Your password"
						value={formValues.password}
						onFocus={handleResetInput}
						onChange={handleInputChange}
					/>
					<label htmlFor="password" className="label">
						Password:
					</label>
					<span
						className={`error ${passwordErrorMessage ? "" : "hiddenError"}`}
					>
						{passwordErrorMessage}
					</span>
					{isPasswordVisible ? (
						<IconEye
							className="icon iconEye"
							onClick={handleSwitchPasswordVisibility}
						/>
					) : (
						<IconEyeClosed
							className="icon iconEye"
							onClick={handleSwitchPasswordVisibility}
						/>
					)}
				</div>
			</div>

			<button type="submit" className="button" disabled={loading}>
				<div className="buttonContent">
					<div className="buttonText">
						{loading && <IconRefresh className="icon iconSpinner" />}
						Login
					</div>
				</div>
			</button>
		</form>
	);
}

export default App;
