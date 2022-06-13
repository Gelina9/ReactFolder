const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  // 注入配置
  config = injectBabelPlugin(
    // 插件名，插件配置
    ['import', {
      libraryName: 'antd',
      libraryDirection: 'es',
      style: 'css', // or 'css'
    }],
    config,
  );
  config = injectBabelPlugin(
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    config,
  );
  return config;
};
