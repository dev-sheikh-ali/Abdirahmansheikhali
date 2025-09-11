// Individual skill from Strapi
export interface Skill {
  id: number;
  name: string | null;
  icon: string | null;
  number: number | null;
}

// Skill category from Strapi
export interface SkillCategory {
  id: number;
  category: string;
  category_icon: string | null;
  skills: Skill[];
}

// Complete skills data structure from Strapi response
export interface HomeDataResponse {
  data: {
    id: number;
    documentId: string;
    Techskills: SkillCategory[];
    [key: string]: any;
  };
  meta: Record<string, unknown>;
}
