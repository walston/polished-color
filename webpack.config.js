const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, "src", "index.html")
    })
  ],
  devServer: {
    port: 8080,
    hot: true
  }
};
