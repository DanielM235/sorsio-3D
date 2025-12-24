/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CARDS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// App version injected at build time from package.json
declare const __APP_VERSION__: string;
declare const __APP_NAME__: string;
