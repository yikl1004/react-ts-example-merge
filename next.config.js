const withPlugins = require('next-compose-plugins');
const withLESS = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const withSCSS = require('@zeit/next-sass');
const path = require('path');


const isObject = obj => {
    const result = Object.prototype.toString.call(obj);
    return result.split(' ')[1].indexOf('Object') > -1;
}

const isArray = obj => Array.isArray(obj)

const deleteMinimizeOption = testArray => (rule, index) => {
    /*
    * css-loder에서 1.0.0 이후로 minimize 옵션이 삭제 됨
    * https://github.com/webpack-contrib/css-loader/releases/tag/v1.0.0
    */

    const func = (test) => isArray(rule.use) && rule.use.map(useItem => {
        if ( isObject(useItem) ) {
            // console.log('====>  ', useItem);
            if (
                rule.test.toString() === test.toString()
                && useItem
                && useItem.hasOwnProperty('loader')
                && useItem.loader === 'css-loader'
                && useItem.options.hasOwnProperty('minimize')
            ) {
                delete useItem.options.minimize;
            }
        
            return useItem;
        } else {
            return useItem;
        }
    });

    isArray(testArray) ?
        testArray.forEach(testItem => func(testItem))
        : func(testArray);

    return rule;
};

const nextConfig = {
    webpack: (config, options) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname)
        };

        return config;
    },
};
module.exports = withPlugins([
    [withSCSS, {
        sourceMap: true,
        importLoaders: 2,
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        webpack(config, options) {
            config.module.rules.map(
                deleteMinimizeOption([/\.css$/, /\.scss$/, /\.sass$/])
            );
            return config;
        }
    }],
    [withCSS, {}],
    // [withLESS, {}],
], nextConfig);