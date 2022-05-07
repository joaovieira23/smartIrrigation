import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthController, { AuthenticationResponse } from '../controllers/Auth.controller';

const AuthContext = createContext<[AuthenticationResponse | null, { isLoading: boolean }]>([null, { isLoading: true }]);

const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<AuthenticationResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AuthController.addListener((user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);

	return <AuthContext.Provider value={[user, { isLoading: loading }]}>{children}</AuthContext.Provider>;
};

function useAuth(): [AuthenticationResponse | null, { isLoading: boolean }] {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth };
