module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: 'readonly',
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    semi: 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'arrow-parens': 'off',
    'max-len': ['off', { code: 110 }],
    'react/function-component-definition': 'off',
    'comma-dangle': 'off',
    'no-alert': 'off',
    'react/button-has-type': 'off',
    'object-curly-newline': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-else-return': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/anchor-is-valid': 'warn',
    'no-underscore-dangle': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/no-array-index-key': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'warn',
    'no-shadow': 'off',
    'import/no-extraneous-dependencies': 'off',
    'arrow-body-style': 'off',
    'no-confusing-arrow': 'off',
    'no-nested-ternary': 'off',
    'operator-linebreak': 'off',
    'no-unsafe-optional-chaining': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
  },
};
