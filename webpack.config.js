// TODO: Delete old js/css files

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const path = require("path");

module.exports = env => {
  const extractLess = new ExtractTextPlugin({
    filename: "css/[name]-[hash].css",
    disable: env.NODE_ENV === "local" // Don't extract css files when serving though webpack-dev-server
  });

  const createHtml = new HtmlWebpackPlugin({
    inject: "body", // Inject script tags into the body instead of head
    template: __dirname + "/src/templates/index.ejs",
    disable: env.NODE_ENV === "local" // Don't create html file when serving though webpack-dev-server
  });

  const envPlugin = new webpack.EnvironmentPlugin({
    NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: false
  });

  const cleanPlugin = new CleanWebpackPlugin(
    ["public/index.html", "public/css", "public/js"],
    {
      root: __dirname,
      dry: env.NODE_ENV === "local" // Don't delete local files when serving through WDS
    }
  );

  return {
    mode: "development", // This gets overwritten by console argument
    entry: {
      app: ["@babel/polyfill", "./src/index"]
    },
    devtool: "source-map", // enable sourcemap
    plugins: [cleanPlugin, envPlugin, extractLess, createHtml],
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]",
              "less-loader?sourceMap"
            ],
            fallback: "style-loader"
          })
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            use: ["css-loader"],
            fallback: "style-loader"
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            test: /[\\/]node_modules[\\/]/,
            //filename: "js/vendors-[contentHash].js",
            name: "vendors",
            enforce: true
          }
        }
      }
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    output: {
      path: __dirname + "/public/",
      publicPath: "",
      filename: "js/main-[hash].js"
    }
  };
};
