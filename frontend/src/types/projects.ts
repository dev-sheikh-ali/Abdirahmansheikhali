export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ProjectThumbnail {
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
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TechStack {
  id: number;
  name: string;
  icon: string | null;
}

export interface Project {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  description: string;
  GitHubLink: string | null;
  LiveLink: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  order: number | null;
  Thumbnail: ProjectThumbnail;
  techStack: TechStack[];
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
