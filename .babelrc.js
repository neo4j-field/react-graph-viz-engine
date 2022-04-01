let presets;
if (process.env.BABEL_ENV === 'es') {
  presets = [["@babel/preset-env", { "modules": false }],"@babel/preset-react","@babel/preset-typescript"];
}
else {
  presets = ["@babel/preset-env","@babel/preset-react","@babel/preset-typescript"];
}

const plugins = [
  "@babel/plugin-transform-runtime"
];

module.exports = {
  presets,
  plugins
};
