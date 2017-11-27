module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2,
            {"SwitchCase": 1}
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "error",
            {"allow": ["log", "debug"]}
        ],
        "func-style": [
            "error",
            "expression",
            {"allowArrowFunctions": true}
        ],
        "no-use-before-define": [
            "error",
            {"functions": true,
             "classes": true,
             "variables": true}
        ],
        "prefer-const": [
            "error", {
              "ignoreReadBeforeAssign": true
            }
        ]
    }
};
