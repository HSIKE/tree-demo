module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  plugins: [
    'babel',
    '@typescript-eslint/eslint-plugin',
    'react-hooks',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // Don't modify the rules if you're going to break the rule,
    // instead, modify your code to comply to the rules.

    // Because we are writing a component lib, and we needs a lot of props passed to HOC.
    'react/jsx-props-no-spreading': 0,

    // only allow __get__ to get unexposed variables in unit tests.
    'no-underscore-dangle': ['error', { allow: ['__get__'] }],

    // This rule should be enabled later.
    'jsx-a11y/control-has-associated-label': 0,

    // This rule is enabled to support both tsx and jsx.
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx', '.jsx'] }],

    // This rule is closed because we're using TypeScript to define prop types.
    'react/prop-types': 0,

    // Imported TypeScript types will be treated as 'unused vars'.
    // The following rule is the replacement for this rule.
    'no-unused-vars': 0,

    '@typescript-eslint/no-unused-vars': 'error',

    // Checks rules of Hooks
    'react-hooks/rules-of-hooks': 'error',

    // Checks effect dependencies
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/explicit-function-return-type': 0,

    // We're building a lib that is for JavaScript users whose valid input could be anything.
    '@typescript-eslint/no-explicit-any': 0,

    // Fix Missing file extension "ts" for "../xxx"  import/extensions
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
