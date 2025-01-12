import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"], // Match all .ts and .tsx files
        rules: {
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  }),
];

export default eslintConfig;
