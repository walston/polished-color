const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.js" },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlPlugin({
      template: "src/index.html"
    })
  ],
  devServer: {
    hot: true
  }
};
