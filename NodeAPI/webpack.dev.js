const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
 
module.exports = {
    entry: './server.js',
    target: 'node',
    mode: 'production', // Changed to 'production' for optimization
    optimization: {
        minimize: true, // Enable minification
        minimizer: [new TerserPlugin({ // Use TerserPlugin for better minification
            terserOptions: {
                keep_classnames: false, // Optional based on your needs
                keep_fnames: false // Optional based on your needs
            }
        })],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        clean: true, 
    },
    externals: [nodeExternals()], // Use the imported function directly
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                DATABASE_SERVER_URL: JSON.stringify('mongodb+srv://mrtvrnk:Lvru3PSwk7I0V1q7@cluster0.nmdeslt.mongodb.net/RADFE203?retryWrites=true&w=majority'),
                SOCKET_PORT: JSON.stringify('7001'),
                PORT: JSON.stringify('80'),
                SECRET_KEY: JSON.stringify('DnSHTiycyyKdpQNAL8EMAxqzLyBpTEM'),
                MAIL_USER: JSON.stringify('m6vuranok@gmail.com'),
                MAIL_PASS: JSON.stringify('hnnz jrbi fajm qxua')
            }
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
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
