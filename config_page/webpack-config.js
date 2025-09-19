/* globals __dirname, module */
/* eslint-disable */
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
const TerserPlugin = require("terser-webpack-plugin");

var config = {
    context: __dirname + '/app',
    entry: {
        app: './js/main.js',
        'app.min': './js/main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    mode: 'production',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            include: /\.min\.js$/
          }),
        ],
    },
    // output files seem to be quite large - changing this from 'source-map' to false makes them much smaller...
    // devtool: 'source-map',
    devtool: false,
    // also increase the max sizes slightly, from 244KiB to 300KiB
    performance: {
        // hints: false,
        maxEntrypointSize: 307200,
        maxAssetSize: 307200,
    },
    module: {


        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: "defaults",
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        autoprefixer,
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                // Silence various depreciation warnings, coming from use of bootstrap
                                // See, for example, here: https://stackoverflow.com/a/78786407
                                // Depreciation IDs are defined here: https://github.com/sass/sass/blob/98c68c3/js-api-doc/deprecations.d.ts
                                silenceDeprecations: ["import", "global-builtin", "color-functions"],
                            },
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        autoprefixer,
                                    ],
                                ],
                            },
                        },
                    },
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // was: loader: 'url-loader?limit=10000&minetype=application/font-woff'
                type: 'asset/inline',
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // was: loader: 'file-loader?name=/[hash].[ext]'
                type: 'asset/resource',
                generator: {
                    filename: '/[hash].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            // Not necessary unless you consume a module using `createClass`
            'create-react-class': 'preact-compat/lib/create-react-class'
        }
    }
};

module.exports = config;
