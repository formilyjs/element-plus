const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
    css: {
        loaderOptions: {
            css: { url: { filter: url => !url.startsWith('/') } }
        }
    },
    transpileDependencies: true,
    chainWebpack: config => {
        config.plugins.delete('fork-ts-checker')
        // config.resolve.alias.set('lodash', path.resolve(__dirname, '../node_modules/lodash/index.js'))
        config.resolve.alias.set('vue-demi', path.resolve(__dirname, '../node_modules/vue-demi/lib/v3/index.mjs'))
        config.resolve.alias.set('vue', path.resolve(__dirname, '../node_modules/vue'))
        config.resolve.alias.set('@formily/element-plus/src', path.resolve(__dirname, '../node_modules/@formily/element-plus/src'))
        config.resolve.alias.set('@formily/element-plus', path.resolve(__dirname, '../node_modules/@formily/element-plus/src'))
        config.resolve.alias.set('@formily/element-plus-prototypes', path.resolve(__dirname, '../node_modules/@formily/element-plus-prototypes/src'))
        config.resolve.alias.set('@formily/element-plus-renderer', path.resolve(__dirname, '../node_modules/@formily/element-plus-renderer/src'))
        config.resolve.alias.set('@formily/element-plus-setters', path.resolve(__dirname, '../node_modules/@formily/element-plus-setters/src'))
        config.resolve.alias.set('@formily/element-plus-settings-form', path.resolve(__dirname, '../node_modules/@formily/element-plus-settings-form/src'))
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
})