// add production webpack config
const { merge }  = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

// define domain for deploy
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode : 'production',
    // output
    output : {
        filename : '[name].[contenthash].js'
    },
    plugins : [
        // config plugins
        new ModuleFederationPlugin({
            name: 'container', // name is host module
            remotes : {
                // remove a source code
                marketing : `marketing@${domain}/marketing/remoteEntry.js`
            },
            //share dependencies
            shared : packageJson.dependencies,
        }),
    ]
}
module.exports = merge(commonConfig, prodConfig)