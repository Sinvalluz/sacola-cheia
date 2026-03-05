import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from './components/providers/theme-provider';
import Home from './pages/Home';
import Register from './pages/Register';

export default function App() {
	return (
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
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}
