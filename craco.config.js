const CracoAntDesignPlugin = require('craco-antd')

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  style: {
    modules: {
      localIdentName: ""
    },
    css: {
      loaderOptions: { /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */ },
      loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
    },
    sass: {
      loaderOptions: { /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */ },
      loaderOptions: (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions; }
    },
  },
  eslint: {
    enable: true /* (default value) */,
    mode: "extends" /* (default value) */ || "file",
    configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
    configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
    pluginOptions: { /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */ },
    pluginOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
  },
  babel: {
    loaderOptions: {
      ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js', './node_modules/react-map-gl/*'],
    },
  },
  typescript: {
    enableTypeChecking: true /* (default value)  */
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@body-background': '#E1E1E1',
          '@primary-color': '#008F4c',
          '@link-color': '#03AB2C',
          '@font-family': 'Roboto',
          '@table-header-bg': '#016B1F',
          '@table-header-color': '#FAFAFA',
          '@table-font-size': '18px',
          '@table-padding-vertical': '16px',
          '@table-padding-horizontal': '16px',
          '@dropdown-font-size': '18px',
          '@dropdown-line-height': '48px',
          '@checkbox-size': '18px',
          '@icon-color': '#03AB2C',
        },
      },
    }
  ]
};