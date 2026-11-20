import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Architecture rules:
 *
 *   shared/   → may import only shared/
 *   modules/x → may import shared/ and its own module, never another module
 *   outputs   → may import shared/ and each module's public index.ts
 *   scripts/  → may import outputs and shared
 */
export default tseslint.config(
  { ignores: ["dist", "out", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { "react-hooks": reactHooks, boundaries },
    settings: {
      "import/resolver": { typescript: { project: "./tsconfig.json" } },
      "boundaries/elements": [
        { type: "shared", pattern: "src/shared/**/*", mode: "full" },
        { type: "module", pattern: "src/modules/(*)/**/*", mode: "full", capture: ["moduleName"] },
        { type: "outputs", pattern: "src/outputs.tsx", mode: "full" },
        { type: "scripts", pattern: "scripts/**/*", mode: "full" },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: { type: "shared" }, allow: { to: { type: "shared" } } },
            {
              from: { type: "module" },
              allow: {
                to: [{ type: "shared" }, { type: "module", captured: { moduleName: "{{from.moduleName}}" } }],
              },
            },
            {
              from: { type: "outputs" },
              allow: { to: [{ type: "shared" }, { type: "module", elementPath: "**/index.ts" }] },
            },
            { from: { type: "scripts" }, allow: { to: [{ type: "outputs" }, { type: "shared" }] } },
          ],
        },
      ],
    },
  },
);
