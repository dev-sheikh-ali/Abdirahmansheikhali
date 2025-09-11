export default function MainLayout({ children, isHero = false }) {
	const containerClasses = isHero
		? 'w-full flex-1 flex flex-col'
		: 'w-full max-w-3xl px-4 flex-1 flex flex-col gap-20 py-16';

	return (
		<main className="min-h-screen bg-black text-white flex flex-col items-center">
			<div className={containerClasses}>{children}</div>
		</main>
	);
}
