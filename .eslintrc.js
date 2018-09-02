module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "extends": "plugin:prettier/recommended",
    "parser": "typescript-eslint-parser",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "prettier",
        "typescript"
    ],
    "rules": {
        "indent": [
            "error",
            "spaces"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};