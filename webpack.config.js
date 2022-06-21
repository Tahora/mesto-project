const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

 module.exports = 
{   entry: { main: './src/components/index.js' },
    output: { path: path.resolve(__dirname, 'dist'), filename: 'main.js', publicPath: '' },
    mode: 'development',
    devServer: { static: path.resolve(__dirname, './dist'), compress: true, port: 8080, open: true },
    module: {  rules: [
                        {   test: /\.js$/,
                            use: 'babel-loader', // исключает папку node_modules, файлы в ней обрабатывать не нужно
                            exclude: '/node_modules/'
                        },
                        {   test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                            type: 'asset/resource'  //перенос исходных файлов в конечную сборку с теми же расширениями
                        },
		        			      {   test: /\.css$/,
                            use:  [  MiniCssExtractPlugin.loader,
                                     {loader: 'css-loader',  options: { importLoaders: 1}},
                                     'postcss-loader' 
                                  ] 
		        			   		}
		        		      ]
            }, 
	plugins: [
	            new HtmlWebpackPlugin({template: './src/index.html'}),
              new CleanWebpackPlugin(),
              new MiniCssExtractPlugin(),
              new ESLintPlugin() 
		       ]
}; 

