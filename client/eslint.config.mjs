import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tailwindcss: tailwind,
    },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
  ...prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
