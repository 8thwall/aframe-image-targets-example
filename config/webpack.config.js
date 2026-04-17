const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootPath = process.cwd()
const distPath = path.join(rootPath, 'dist')
const srcPath = path.join(rootPath, 'src')

const ATTRIBUTES_TO_EXPAND = [
  'src', 'gltf-model', 'cover-image-url', 'footer-image-url', 'watermark-image-url',
]

const makeJsLoader = () => ({
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
  exclude: /node_modules/,
})

const makeTsLoader = () => ({
  test: /\.ts$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
})

const makeCssLoader = () => ({
  test: /\.css$/,
  exclude: /\/assets\//,
  use: ['style-loader', 'css-loader'],
})

const makeSassLoader = () => ({
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
})

const makeAssetLoader = () => ({
  test: /\..*$/,
  include: [path.join(srcPath, 'assets'), path.join(srcPath, 'targets')],
  exclude: /\.(js|ts|json)$/,
  loader: path.join(__dirname, 'asset-loader.js'),
})

const makeDefaultHtmlLoader = () => ({
  test: /\.html$/,
  use: {
    loader: 'html-loader',
    options: {
      esModule: false,
      sources: {
        list: [
          '...',
          {
            tag: 'script',
            attribute: 'src',
            type: 'src',
            filter: () => false,
          },
          ...ATTRIBUTES_TO_EXPAND.map(attr => ({
            tag: '*',
            attribute: attr,
            type: 'src',
          })),
        ],
      },
    },
  },
})

const config = {
  entry: path.join(srcPath, 'app.js'),
  output: {
    filename: 'bundle.js',
    path: distPath,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(rootPath, 'external'),
          to: path.join(distPath, 'external'),
          noErrorOnMissing: true,
        },
        {
          from: path.join(srcPath, 'assets'),
          to: path.join(distPath, 'assets'),
          noErrorOnMissing: true,
        },
        {
          from: path.join(rootPath, 'image-targets'),
          to: path.join(distPath, 'image-targets'),
          noErrorOnMissing: true,
        },
        {
          from: path.join(srcPath, 'targets'),
          to: path.join(distPath, 'targets'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(srcPath, 'targets'), 'node_modules'],
  },
  module: {
    rules: [
      makeJsLoader(),
      makeTsLoader(),
      makeCssLoader(),
      makeSassLoader(),
      makeAssetLoader(),
      makeDefaultHtmlLoader(),
    ],
  },
  mode: 'production',
  context: srcPath,
  devServer: {
    open: false,
    compress: true,
    hot: true,
    liveReload: false,
    static: [
      {
        directory: path.join(srcPath, 'targets'),
        publicPath: '/targets',
      },
      {
        directory: path.join(srcPath, 'targets'),
        publicPath: '/image-targets',
      },
      {
        directory: path.join(srcPath, 'targets'),
        publicPath: '/',
      },
      {
        directory: path.join(srcPath, 'assets'),
        publicPath: '/assets',
      },
    ],
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.join(rootPath, 'key.pem')),
        cert: fs.readFileSync(path.join(rootPath, 'cert.pem')),
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
}

module.exports = config
