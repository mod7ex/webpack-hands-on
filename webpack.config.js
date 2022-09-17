const path = require("path");

const mode = process.env.NODE_ENV || "development";

const config = {
    mode,

    entry: {
        main: ["./src/bootstrap.js"], // in case of many files
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        // filename: '[name]-[hash:8]-bundel.js',
        filename: "[name]-bundel.js",
        publicPath: "/",
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
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                /**
                    css-loader helps parsing the css files
                    whereas style-loader injects the styles in to the document
                */
            },
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }

    if (argv.mode === "production") {
        // ...
    }

    return config;
};
