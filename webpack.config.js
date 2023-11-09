const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/NWReact.js",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "./public"),
        },
        port: 4321,
        open: true
    },
    resolve: {
        extensions: [".*", ".js", ".jsx", ".scss", ".ts", ".tsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|jpeg|woff|woff2|eot|ttf|svg|ico|pdf)$/,
                loader: "url-loader",
                options: {
                    limit: 100000
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "bundle.js"
    }
};