const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const CMD = {
    DEV: "dev",
    BUILD: "build",
};

const npmCMD = process.env.npm_lifecycle_event;

const config = {
    mode: process.env.NODE_ENV || "development",

    entry: {
        main: ["./src/bootstrap.js"], // in case of many files
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[contenthash]-bundel.js",
    },

    // watch: true, // no need for this in case of devServer

    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },

        port: 9000,

        hot: true,

        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
        },
    },

    devtool: npmCMD === CMD.DEV ? "source-map" : false,

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    npmCMD === CMD.BUILD ? MiniCssExtractPlugin.loader : "style-loader", // on build we want to extract css into files check down for more details
                    "css-loader",
                    "sass-loader",
                ],
                /**
                    css-loader helps parsing the css files
                    whereas style-loader injects the styles in to the document
                */
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

if (npmCMD === CMD.BUILD) {
    config.mode = "production";

    (config.plugins || (config.plugins = [])).push(
        // extracting css files
        new MiniCssExtractPlugin({
            // same name as input files ---> main
            filename: "[name]-[contenthash]-bundel.css",
        })
    );
}

module.exports = config;

/*

// we can get same variable <npmCMD> from the following function (argv)

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }

    if (argv.mode === "production") {
        // ...
    }

    return config;
};

*/
