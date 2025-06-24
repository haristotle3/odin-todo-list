const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  devtool: "eval-source-map",
  devServer: {
    watchfiles: ["./src/template.html"],
  },
};
