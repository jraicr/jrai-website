import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jrai.dev',
  integrations: [vue(), sitemap({
    i18n: {
      defaultLocale: 'es', // All urls that don't contain `en` or `fr` after `https://jrai.dev/` will be treated as default locale,
      locales: {
        es: 'es-ES', // The `defaultLocale` value must present in `locales` keys
        en: 'en-US', 
      },
    },
  }), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })]
});