module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-css-modules'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  core: {
    disableTelemetry: true
  },

  docs: {
    autodocs: true
  }
};
