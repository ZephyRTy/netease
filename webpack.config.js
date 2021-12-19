/* eslint-disable no-underscore-dangle */
import path from 'path';
let __dirname = path.resolve();
export default {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'app.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	target: 'web',
	module: {
		// 所有第三方模块的匹配规则， webpack默认只能处理.js后缀名的文件，需要安装第三方loader
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				],
				exclude: [path.resolve(__dirname, '..', 'node_modules')]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: ['file-loader']
			}
		]
	}
};
