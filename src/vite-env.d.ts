/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type ImportMetaEnv = {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_OPENAI_API_URL: string;
  readonly VITE_OPENAI_MODEL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
