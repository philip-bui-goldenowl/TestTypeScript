const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json','.ts','.tsx'],
    alias: {
      '@': './src',
    },
  },
]);

plugins.push(['module:react-native-dotenv']);

module.exports = {
  presets,
  plugins,
};
