var port = process.env.PORT || 3000;

module.exports = {
  entry: './src/init',
  devtool: 'source-map',
  output: {
    path: './dist/',
    filename: "./index.js",
    publicPath: '/'
  },
  
  devServer: {
    inline: true,
    contentBase: './dist/',
    port: port
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};