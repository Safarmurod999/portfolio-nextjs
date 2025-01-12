module.exports = {
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],  // Match all .ts and .tsx files
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
