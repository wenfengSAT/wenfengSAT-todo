module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  //...
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.{js,vue}", "!**/icons/**", "!**/node_modules/**"],
  moduleNameMapper: {
    "^@/(.*?.?(js|vue)?|)$": "<rootDir>/src/$1" // @路径转换，例如：@/views/login.vue -> rootDir/src/login.vue
  }
};
