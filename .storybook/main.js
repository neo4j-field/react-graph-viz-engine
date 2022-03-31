const path = require('path');

module.exports = {
  stories: ['../src/component/**/*.stories.tsx'],
  addons: ['@storybook/addon-controls/register', 'storybook-addon-jsx', '@storybook/addon-docs'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src'),
    });

    return config;
  }

};