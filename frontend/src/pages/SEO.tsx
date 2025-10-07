


import SEO from '../components/common/SEO';

const structuredData = {
	"@context": "https://schema.org",
	"@type": "Person",
	"name": "Abdirahman Sheikh Ali",
	"url": "https://abdirahmansheikhali.com/",
	"image": "https://abdirahmansheikhali.com/assets/preview.jpg",
	"jobTitle": "Software Engineer & Child Safety Advocate",
	"sameAs": [
		"https://github.com/dev-sheikh-ali",
		"https://www.linkedin.com/in/ali-sheikh-dev/"
	],
	"description": "Purpose-driven technologist dedicated to ethical, intelligent systems, child safety, and digital inclusion."
};

export default function SEOLanding() {
	return (
		<>
			<SEO
				title="Abdirahman Sheikh Ali | Software Engineer, AI, IoT, Child Safety Advocate"
				description="Purpose-driven technologist, software engineer, and advocate for child safety, AI ethics, and digital inclusion. Explore projects, blog, and more."
				image="/assets/preview.jpg"
				url="https://abdirahmansheikhali.com/"
			/>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<main style={{ padding: '2rem', color: '#fff', background: '#111', minHeight: '100vh' }}>
				<header>
					<h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Abdirahman Sheikh Ali</h1>
					<h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa', marginBottom: '1rem' }}>Software Engineer, AI & IoT Specialist, Child Safety Advocate</h2>
				</header>
				<p style={{ fontSize: '1.2rem', maxWidth: 700, margin: '0 auto 1.5rem auto', color: '#d1d5db' }}>
					Purpose-driven technologist dedicated to ethical, intelligent systems, child safety, digital inclusion, and impactful software engineering. Find my work on AI, IoT, advocacy, and more.
				</p>
				<nav aria-label="Main navigation">
					<ul style={{ marginTop: '2rem', fontSize: '1.2rem', display: 'flex', gap: '2rem', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
						<li><a href="/" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Home</a></li>
						<li><a href="/projects" style={{ color: '#34d399', textDecoration: 'underline' }}>Projects</a></li>
						<li><a href="/blog" style={{ color: '#f472b6', textDecoration: 'underline' }}>Blog</a></li>
					</ul>
				</nav>
			</main>
		</>
	);
}
