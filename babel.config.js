const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json','.ts','.tsx','.jpg'],
    alias: {
      '@': './src',
    },
  },
]);

plugins.push(['module:react-native-dotenv']);
plugins.push(['react-native-reanimated/plugin']);

module.exports = {
  presets,
  plugins,
};
