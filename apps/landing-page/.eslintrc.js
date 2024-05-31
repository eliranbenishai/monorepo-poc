/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["../../packages/config/eslint/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
