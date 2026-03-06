import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from './components/providers/theme-provider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				defaultTheme='system'
				storageKey='vite-ui-theme'
			>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/register'
							element={<Register />}
						/>
						<Route
							path='/login'
							element={<Login />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
