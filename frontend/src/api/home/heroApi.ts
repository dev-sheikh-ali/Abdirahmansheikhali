import cmsClient from '../../lib/cmsClient';

// Helper to build absolute URLs
export function buildUrl(url: string): string {
  if (!url) return '';
  const BASE_URL = import.meta.env.VITE_STRAPI_URL || '';
  return url.startsWith('http') ? url : `${BASE_URL}${url}`;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface BioBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

export interface CTAButton {
  id: number;
  label: string;
  link: string;
  type: string;
}

export interface ContactIcon {
  id: number;
  platform: string;
  icon: string;
  link: string | null;
}

export interface HeroData {
  id: number;
  documentId: string;
  intro: string;
  tagline: string;
  name?: string;  // This field is derived from data.title in fetchHeroData
  title?: string; // Added the actual field from Strapi
  bio: BioBlock[];
  images: ImageData[];
  cta_primary: CTAButton;
  cta_secondary: CTAButton;
  contact_icons: ContactIcon[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export async function fetchHeroData(): Promise<HeroData> {
  const res = await cmsClient.get('/home?populate=*');
  const data = res.data.data;

  // Process the images to add the full URLs
  const images = data.images.map((img: ImageData) => ({
    ...img,
    url: buildUrl(img.url),
    formats: {
      thumbnail: { ...img.formats.thumbnail, url: buildUrl(img.formats.thumbnail.url) },
      small: { ...img.formats.small, url: buildUrl(img.formats.small.url) },
      medium: { ...img.formats.medium, url: buildUrl(img.formats.medium.url) },
      large: { ...img.formats.large, url: buildUrl(img.formats.large.url) },
    }
  }));

  // Process contact icons to add full URLs
  const contact_icons = data.contact_icons.map((icon: ContactIcon) => ({
    ...icon,
    icon: buildUrl(icon.icon),
  }));

  return {
    id: data.id,
    documentId: data.documentId,
    intro: data.intro,
    tagline: data.tagline,
    name: data.title || 'Abdirahman Sheikh Ali', // Using title field instead of name
    bio: data.bio,
    cta_primary: data.cta_primary,
    cta_secondary: data.cta_secondary,
    images,
    contact_icons,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    publishedAt: data.publishedAt
  };
}
