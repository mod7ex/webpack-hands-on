module.exports = function (api) {
    const IS_PROD = api.env("production");

    const plugins = [];

    if (!IS_PROD) plugins.push("react-refresh/babel");

    return {
        presets: [
            /* [ "@babel/preset-env", { useBuiltIns: "usage", corejs: 3, targets: "defaults" } ] */
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
        ],

        plugins,
    };
};
