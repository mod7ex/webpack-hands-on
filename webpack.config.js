const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const path = require('path');

const npmScript = process.env.npm_lifecycle_event;

const mode = process.env.NODE_ENV || 'development';

const IS_BUILD_DEV = npmScript === 'build-dev';
const IS_PROD = mode === 'production';
const IS_DEV = !IS_PROD;

const config = {
   mode,

   entry: {
      main: ['./src/bootstrap.ts'], // array in case of many files
   },

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[contenthash]-bundel.js',
   },

   // watch: true, // no need for this in case of devServer

   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },

      port: 9000,

      // hot: true,

      open: true,

      client: {
         overlay: {
            errors: true,
            warnings: true,
         },
      },
   },

   devtool: IS_DEV ? 'source-map' : false,

   module: {
      rules: [
         {
            test: /\.((ts|js)x?)?$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },

         {
            test: /\.s[ac]ss$/i,
            use: [
               IS_BUILD_DEV || IS_PROD
                  ? {
                       loader: MiniCssExtractPlugin.loader,
                       options: { publicPath: '' },
                    }
                  : 'style-loader', // on build we want to extract css into files check down for more details
               'css-loader',
               'sass-loader',
            ],
            /*
                    css-loader helps parsing the css files
                    whereas style-loader injects the styles in to the document
                    and <MiniCssExtractPlugin> extracts it into separate files
                */
         },
         {
            // this is built-in into WebPack
            test: /\.(?:ico|png|jpe?g|gif)$/i,
            type: 'asset/resource',
         },
         {
            // this is built-in into WebPack
            test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
            type: 'asset/inline',
         },
      ],
   },

   resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'], // resolve imports without file extensions ,add the <?> to the test(regex) to make the extension optional
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html',
      }),
      new DefinePlugin({
         'process.env.name': 'Hello Mourad, a env var from webpack',
      }),
   ],
};

if (IS_PROD) {
   (config.plugins || (config.plugins = [])).push(
      new MiniCssExtractPlugin({
         // extracting css files
         // same name as input files ---> main
         filename: '[name]-[contenthash]-bundel.css',
      })
   );
} else {
   (config.plugins || (config.plugins = [])).push(
      new ReactRefreshWebpackPlugin(),
      new HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin()
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
