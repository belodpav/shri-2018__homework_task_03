module.exports = {
    extends: 'loris/es6',
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
      sourceType: "module",
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }]
    }
};