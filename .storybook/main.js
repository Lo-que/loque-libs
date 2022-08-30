module.exports = {
  stories: [
    '../packages/components/stories/**/*.stories.mdx',
    '../packages/components/stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-swc',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    },
    'storybook-dark-mode'
  ],
  framework: '@storybook/react',
  core: {
    disableTelemetry: true,
    builder: {
      name: 'webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true
      }
    }
  },
  webpackFinal: config => {
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/i

    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack']
      }
    )
    return config
  }
}
