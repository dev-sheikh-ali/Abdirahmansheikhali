/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_OWNER: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_GITHUB_TOKEN?: string;
  readonly VITE_STRAPI_URL: string;
  readonly VITE_STRAPI_TOKEN: string;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
