const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Load JS and JSX files through Babel
 */
const babelLoader = {
	rules: [
		{
			test: /\.tsx?$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', { runtime: 'automatic' }],
						],
					},
				},
				'ts-loader',
			],
			exclude: /node_modules/,
		},
		{
			test: /.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						['@babel/preset-react', { runtime: 'automatic' }],
					],
				},
			},
		},
		{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.s[ac]ss$/i,
			use: [
				// Creates `style` nodes from JS strings
				'style-loader',
				// Translates CSS into CommonJS
				'css-loader',
				// Compiles Sass to CSS
				'sass-loader',
			],
		},
	],
}

const resolve = {
	extensions: ['.js', '.jsx', '.tsx', '.ts', '.css', '.scss', '.sass'],
}

const serverConfig = {
	name: 'server',
	target: 'node',
	mode: 'development',
	entry: './src/server/server.tsx',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'server.cjs',
	},
	module: babelLoader,
	plugins: [
		new webpack.EnvironmentPlugin({
			PORT: 3001,
		}),
	],
	resolve,
}

const clientConfig = {
	name: 'client',
	target: 'web',
	mode: 'development',
	entry: './src/client/index.tsx',
	output: {
		path: path.join(__dirname, '/dist'),
		/*
		 * Appends /static to index.html when looking for client.js
		 * This is where Express is serving static files from
		 */
		publicPath: '/static',
		filename: 'client.js',
	},
	module: babelLoader,
	plugins: [
		new htmlWebpackPlugin({
			template: `${__dirname}/src/client/index.html`,
		}),
	],
	resolve,
}

const secretarConfig = {
	name: 'secretar',
	target: 'node',
	mode: 'development',
	entry: './src/telegramBot/secretar.tsx',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'secretar.cjs',
	},
	module: babelLoader,
	plugins: [],
	resolve,
}

module.exports = [serverConfig, clientConfig, secretarConfig]
