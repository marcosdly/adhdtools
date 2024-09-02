const CombineDuplicates = require('postcss-combine-duplicated-selectors');

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [CombineDuplicates({ removeDuplicatedProperties: true })],
};
