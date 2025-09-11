
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import ErrorPage from './pages/ErrorPage';

function AppContent() {
	const location = useLocation();
	const isHomePage = location.pathname === '/';

	return (
		<>
			<Navbar />
			<MainLayout isHero={isHomePage}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</MainLayout>
			<Footer />
		</>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}
