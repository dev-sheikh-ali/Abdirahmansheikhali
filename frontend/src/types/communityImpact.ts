interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
}

export interface CommunityImpactItem {
  id: number;
  title: string;
  image: StrapiImage | null;
  description: {
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }[];
  location: string;
  date: string;
}

export interface CommunityImpactResponse {
  data: {
    community: CommunityImpactItem[];
  };
}
