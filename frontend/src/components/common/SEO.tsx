import React from 'react';

interface SEOProps {
	title: string;
	description: string;
	image: string;
	url: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => (
	<>
		{/* Standard SEO */}
		<title>{title}</title>
		<meta name="description" content={description} />
		<link rel="canonical" href={url} />
		{/* Open Graph / Facebook */}
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={image} />
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		{/* Twitter */}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
	</>
	
);

export default SEO;
