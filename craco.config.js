const pkgRegex = (...args) => new RegExp(`node_modules\\/(${args.join('|')})\\/`);

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV !== 'production') return webpackConfig;
      // eslint-disable-next-line no-param-reassign
      webpackConfig.optimization = {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            echarts: {
              test: pkgRegex('echarts'),
              name: 'echarts',
              priority: 100,
            },
            common: {
              test: pkgRegex('react', 'react-dom'),
              name: 'common',
              priority: 80,
            },
            modules: {
              test: /node-modules/,
              name: 'modules',
              priority: 10,
            },
          },
        },
      };
      return webpackConfig;
    },
  },
};
