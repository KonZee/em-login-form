export type LoginVariables = {
	email: string;
	password: string;
};

export type LoginSuccess = { success: boolean; token: string };
export type LoginError = { success: boolean; error: string };

export type LoginResponse = {
	ok: boolean;
	status: 200 | 401; // Enough for now
	json: () => Promise<LoginSuccess> | Promise<LoginError>;
};

export const mockLoginFetch = (credentials: LoginVariables) => {
	return new Promise<LoginResponse>((resolve) => {
		// Wait for 0.5 seconds (500ms)
		setTimeout(() => {
			// Check if credentials match the expected values
			if (
				credentials.email === "test@test.com" &&
				credentials.password === "12345"
			) {
				// Success response
				resolve({
					ok: true,
					status: 200,
					json: () =>
						Promise.resolve({
							success: true,
							token: "fake-jwt-token-for-testing",
						}),
				});
			} else {
				// Error response
				resolve({
					ok: false,
					status: 401,
					json: () =>
						Promise.resolve({
							success: false,
							error: "Invalid email or password",
						}),
				});
			}
		}, 500);
	});
};
