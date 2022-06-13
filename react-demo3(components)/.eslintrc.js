module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 1,
    'no-const-assign': 2,
    'no-extra-parens': 2,
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'arrow-parens': ['error', 'as-needed'], // 箭头函数括号
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': ['error', 'static public field'],
    'max-classes-per-file': [
      'error',
      { ignoreExpressions: true, max: 2 },
    ],
    'react/destructuring-assignment': [0],
    'class-methods-use-this': 'off',
  },
};
