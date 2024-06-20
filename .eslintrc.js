// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended", // 使用 ESLint 推荐的规则
    "plugin:react/recommended", // 使用 React 推荐的规则
    "plugin:@typescript-eslint/recommended", // 使用 TypeScript 推荐的规则
  ],
  parser: "@typescript-eslint/parser", // 使用 TypeScript 解析器
  parserOptions: {
    ecmaVersion: 2021, // ECMAScript 版本，根据需要进行更改
    sourceType: "module", // 模块导入方式
    ecmaFeatures: {
      jsx: true, // 启用JSX语法支持
    },
  },
  plugins: [
    "react", // React相关的ESLint插件
    "@typescript-eslint", // TypeScript相关的ESLint插件
  ],
  rules: {
    // 在这里添加你的自定义规则
    "no-unused-vars": "off", // 关闭未使用的变量检查，可以根据需要启用
    "@typescript-eslint/no-unused-vars": ["error"], // 使用TypeScript的规则检查未使用的变量
    "react/prop-types": "off", // 关闭prop-types检查，如果你不使用prop-types
    "react/react-in-jsx-scope": "off", // 关闭React在JSX中的全局引入，适用于React 17+
    "react/display-name": "off", // 关闭组件名称的检查，如果你不需要
  },
  settings: {
    react: {
      version: "detect", // 自动检测React版本
    },
  },
};
