// Individual expertise item from Strapi
export interface ExpertiseItem {
  id: number;
  icon: string | null;
  title: string | null;
  decription: string | null;
  link: string | null;
}

export interface HomeData {
  id: number;
  documentId: string;
  intro: string;
  tagline: string;
  bio: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  expertise: ExpertiseItem[];
}

export interface HomeDataResponse {
  data: HomeData;
  meta: Record<string, unknown>;
}
