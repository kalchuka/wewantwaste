/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_WEWANTWASTE_URL: string;
    // Add more custom env vars here:
    // readonly VITE_SOME_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }