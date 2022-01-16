const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    watchOptions: {
        aggregateTimeout: 500, // delay before reloading to batch changes together
        poll: 1000, // enable polling since fsevents are not supported in docker
        ignored: [
            '/node_modules/'
        ]
    },
    devServer: {
        port: 8001,
        host: '0.0.0.0', // to accept connections from outside container
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:
                './public/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
};