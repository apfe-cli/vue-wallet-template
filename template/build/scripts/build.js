require('../util/check-versions')()

process.env.NODE_ENV = 'production'

const {
  chalk,
  rimraf,
} = require('xutil')
const ora = require('ora')
const path = require('path')
const webpack = require('webpack')
const config = require('../config/index')
const webpackConfig = require('../webpack/webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rimraf(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
