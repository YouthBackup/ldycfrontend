module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint', // or '@babel/eslint-parser' if you're using it
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended', // or 'plugin:vue/essential' for Vue 2
    'eslint:recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // Optional
  },
};
