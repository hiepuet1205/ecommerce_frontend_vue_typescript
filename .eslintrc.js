module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
  ],
  parser: "vue-eslint-parser",
}