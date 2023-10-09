const { builtinModules } = require('module');

module.exports = {
    // Configuration for JavaScript files
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        // "project": "./tsconfig.json",
        "extraFileExtensions": [
            ".astro"
        ] // This is a required setting in `@typescript-eslint/parser` v5.
    },
    "overrides": [
        // Configuration for mjs,cjs files
        {
            "files": [
                "*.mjs",
                "*.cjs"
            ],
            "rules": {

            }
        },
        // Configuration for TypeScript files
        {
            "parser": "@typescript-eslint/parser",
            "files": [
                "*.ts",
                "*.tsx"
            ],
            "plugins": [
                "@typescript-eslint"
            ],
            "parserOptions": {
                "project": "./tsconfig.json"
            },
            "rules": {
                // Avoid missing file extension errors when using '@/' alias
                "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
                "import/prefer-default-export": "off", // Named export is easier to refactor automatically
                "@typescript-eslint/no-unused-vars": "off"
            }
        },
        // Configuration for Astro
        {
            "files": [
                "*.astro"
            ],
            "plugins": [
                "@typescript-eslint"
            ],
            "parser": "astro-eslint-parser",
            "parserOptions": {
                "parser": "@typescript-eslint/parser"
            },
            "rules": {
                // Accept jsx in astro files
                "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
                "@typescript-eslint/no-unused-vars": "off"
            },
            "globals": {
                "Astro": "readonly"
            }
        }
    ]
}