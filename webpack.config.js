const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/,
                use: ['file-loader']
            },
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: "umd",
        library: {
            name: 'react-graph-viz-engine',
            type: 'umd',
          },
      },
    devServer: {
        port: 3000,
        hot: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};