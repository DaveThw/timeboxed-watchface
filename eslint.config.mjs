import { defineConfig, globalIgnores } from "eslint/config";
import promise from "eslint-plugin-promise";
import preferObjectSpread from "eslint-plugin-prefer-object-spread";
import noLoops from "eslint-plugin-no-loops";
import sortImportsEs6Autofix from "eslint-plugin-sort-imports-es6-autofix";
import react from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["config_page/server/*"]), {
    extends: compat.extends("eslint:recommended", "plugin:react/recommended"),

    plugins: {
        promise,
        "prefer-object-spread": preferObjectSpread,
        "no-loops": noLoops,
        "sort-imports-es6-autofix": sortImportsEs6Autofix,
        "prefer-object-spread": preferObjectSpread,
        react,
        promise,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            ...globals.mocha,
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
      react: {
        version: "detect", // React version. "detect" automatically picks the version you have installed.
      },
    },

    rules: {
        "max-len": ["warn", 120],
        "constructor-super": "warn",
        "multiline-ternary": ["warn", "always-multiline"],

        indent: ["warn", 4, {
            SwitchCase: 1,
        }],

        quotes: ["warn", "single"],
        "linebreak-style": ["warn", "unix"],

        "brace-style": ["warn", "1tbs", {
            allowSingleLine: false,
        }],

        curly: ["warn", "multi-line", "consistent"],
        "no-case-declarations": "warn",
        "no-console": "warn",
        "no-constant-condition": "warn",
        "no-extra-semi": "warn",
        "no-empty": "warn",
        "no-empty-pattern": "warn",
        "no-fallthrough": "warn",
        "no-inner-declarations": "warn",
        "no-irregular-whitespace": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-extra-boolean-cast": "warn",
        "no-redeclare": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "no-lonely-if": "warn",
        "no-useless-concat": "warn",
        "prefer-template": "warn",
        eqeqeq: "warn",
        "no-useless-escape": "warn",
        "no-eval": "error",
        "no-implied-eval": "error",
        "no-undef-init": "warn",
        "capitalized-comments": "off",
        "no-nested-ternary": "warn",
        "one-var": ["warn", "never"],
        semi: ["warn", "always"],
        "arrow-parens": ["warn", "always"],
        "comma-dangle": ["warn", "always-multiline"],
        "promise/always-return": "warn",
        "promise/no-return-wrap": "warn",
        "promise/param-names": "warn",

        "promise/catch-or-return": ["off", {
            allowThen: true,
        }],

        "promise/no-native": "off",
        "promise/no-nesting": "off",
        "promise/no-promise-in-callback": "off",
        "promise/no-callback-in-promise": "off",
        "promise/avoid-new": "off",
        "prefer-object-spread/prefer-object-spread": "warn",
        "sort-imports-es6-autofix/sort-imports-es6": "warn",
        "no-loops/no-loops": "warn",
        "no-var": "error",

        "react/jsx-closing-bracket-location": ["warn", {
            selfClosing: "line-aligned",
            nonEmpty: "after-props",
        }],

        "react/jsx-wrap-multilines": ["warn", {
            declaration: true,
            assignment: true,
            return: true,
            arrow: true,
        }],

        "react/no-deprecated": "warn",
        "react/jsx-key": "warn",
        "react/no-children-prop": "warn",
        "react/no-string-refs": "warn",
        "react/no-find-dom-node": "warn",
    },
}]);