const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const npmScript = process.env.npm_lifecycle_event;

const mode = process.env.NODE_ENV || "development";

const IS_BUILD_DEV = npmScript === "build-dev";
const IS_PROD = mode === "production";
const IS_DEV = !IS_PROD;

const config = {
    mode,

    entry: {
        main: ["./src/bootstrap.ts"], // array in case of many files
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

    devtool: IS_DEV ? "source-map" : false,

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "ts-loader"],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    IS_BUILD_DEV || IS_PROD ? MiniCssExtractPlugin.loader : "style-loader", // on build we want to extract css into files check down for more details
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

    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"], // resolve imports without file extensions
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

if (IS_PROD) {
    config.target = "es5";

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

// we can get same variable <npmScript> from the following function (argv)

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
