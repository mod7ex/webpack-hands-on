// Eslint VSCode extension should be installed

module.exports = {
   parser: '@typescript-eslint/parser',

   parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
   },

   extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      // 'plugin:prettier/recommended',
      'prettier',
   ],

   plugins: ['prettier'],

   rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
   },

   settings: {
      react: {
         version: 'detect',
      },
   },
};
