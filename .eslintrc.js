module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "process": "readonly",
        "__dirname": "readonly",
        "__filename": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        sourceType: "module"
    },
    "rules": {
        "no-console": "off",
        "no-unused-vars": "off"
    },
};