import { useState } from 'react';

export default function Footer() {
	return (
		<footer className="bg-black text-gray-300 w-full pt-0 pb-0 border-t-2 border-neutral-800">
			{/* Main Footer Content */}
			<div className="max-w-6xl mx-auto px-4 md:px-0 pt-10 pb-6 grid grid-cols-1 md:grid-cols-3 gap-8">
										{/* Name and Tagline Only */}
										<div>
											<h2 className="text-xl font-bold mb-1">Abdirahman Sheikh Ali</h2>
											<p className="text-sm text-gray-400">Software engineer | child safety advocate</p>
											{/* logo */}
											<div className="mt-2">
												<img src="/assets/logo.png" alt="Logo" className="h-16 w-16 rounded-full" />
											</div>
										</div>
				{/* Quick Links */}
				<div>
					<h3 className="text-lg font-semibold mb-2">Quick Links</h3>
					<ul className="space-y-2">
						<li><a href="#about" className="hover:text-green-400 transition">About Me</a></li>
						<li><a href="#projects" className="hover:text-green-400 transition">Projects</a></li>
						<li><a href="#blog" className="hover:text-green-400 transition">Blog</a></li>
					</ul>
				</div>
				{/* Contact */}
				<div>
					<h3 className="text-lg font-semibold mb-2">Contact Me</h3>
					<ul className="space-y-2">
						<li className="flex items-center gap-2">
							<svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.21.49 2.53.76 3.88.76.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.01c.55 0 1 .45 1 1 0 1.35.27 2.67.76 3.88.17.41.07.89-.21 1.11l-2.2 2.2z" /></svg>
							<span>+254711839995</span>
						</li>
						<li className="flex items-center gap-2">
							<svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19.5 4h-15A2.5 2.5 0 002 6.5v11A2.5 2.5 0 004.5 20h15a2.5 2.5 0 002.5-2.5v-11A2.5 2.5 0 0019.5 4zm0 1.5a1 1 0 01.71.29l-7.21 6.48-7.21-6.48A1 1 0 014.5 5.5h15zm-15 13a1 1 0 01-1-1V7.12l7.72 6.94a1.5 1.5 0 002.06 0l7.72-6.94V17.5a1 1 0 01-1 1h-15z" /></svg>
							<span>abdirahman.dev44@gmail.com</span>
						</li>
					</ul>
				</div>
			</div>
			{/* Social Icons and Copyright */}
			<div className="bg-black pt-6 pb-4">
				<div className="max-w-6xl mx-auto px-4 md:px-0">
					   <div className="border-t-4 border-neutral-800 w-full mb-6"></div>
					   <div className="flex justify-center space-x-8 mb-3">
					   <a href="https://www.linkedin.com/in/abdirahman-sheikh-ali/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
						   <svg className="w-8 h-8 text-blue-600 hover:text-blue-400 transition drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg>
					   </a>
					   <a href="https://github.com/dev-sheikh-ali" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						   <svg className="w-8 h-8 text-gray-200 hover:text-gray-100 transition drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" /></svg>
					   </a>
					   <a href="https://www.tiktok.com/@abdirahman_sheikh_ali" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
						   <svg className="w-8 h-8 text-pink-500 hover:text-pink-400 transition drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M9.5 3c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v2.25c0 2.07 1.68 3.75 3.75 3.75h1.25c.28 0 .5.22.5.5v2.25a.5.5 0 01-.5.5c-1.13 0-2.22-.23-3.22-.66v6.16a5.25 5.25 0 11-5.25-5.25c.28 0 .5.22.5.5v2.25c0 .28-.22.5-.5.5a2.25 2.25 0 102.25 2.25V3z" /></svg>
					   </a>
					   <a href="https://wa.me/254711839995" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
						   <svg className="w-8 h-8 text-green-400 hover:text-green-300 transition drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.08 4.88 4.2.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" /></svg>
					   </a>
					   <a href="tel:+254711839995" aria-label="Call">
						   <svg className="w-8 h-8 text-blue-400 hover:text-blue-300 transition drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.21.49 2.53.76 3.88.76.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.01c.55 0 1 .45 1 1 0 1.35.27 2.67.76 3.88.17.41.07.89-.21 1.11l-2.2 2.2z" /></svg>
					   </a>
					</div>
					   <p className="text-base text-gray-400 text-center font-medium">© {new Date().getFullYear()} Abdirahman Sheikh Ali™. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
}
