import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import AccountPage from './pages/Account';
import Detail from './pages/Detail';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';

function App() {
	return (
		<>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route
						path="/account"
						element={
							<ProtectedRoute>
								<AccountPage />
							</ProtectedRoute>
						}
					/>
					<Route path="/movie-detail" element={<Detail />} />
					<Route path="*" element={<h1>404</h1>} />
				</Routes>
			</AuthContextProvider>
		</>
	);
}

export default App;
