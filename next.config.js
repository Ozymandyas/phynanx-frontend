/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  compress: true,
  /** it was to use top level await for pdf-lib */
  // webpack: config => {
  //   // this will override the experiments
  //   config.experiments = { topLevelAwait: true }
  //   // this will just update topLevelAwait property of config.experiments
  //   // config.experiments.topLevelAwait = true
  //   return config
  // },
}

module.exports = nextConfig

