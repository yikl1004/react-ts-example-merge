const withPlugins = require('next-compose-plugins');
const withLESS = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const path = require('path');


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
    [withCSS, {
        sourceMap: true,
        importLoaders: 2,
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        webpack(config, options) {
            config.module.rules.map(rule => {
                /*
                * css-loder에서 1.0.0 이후로 minimize 옵션이 삭제 됨
                * https://github.com/webpack-contrib/css-loader/releases/tag/v1.0.0
                */
                const loaderGroup =  rule.use[2];
                if (
                    rule.test.toString() === '/\\.css$/'
                    && loaderGroup
                    && loaderGroup.hasOwnProperty('loader')
                    && loaderGroup.loader === 'css-loader'
                    && loaderGroup.options.hasOwnProperty('minimize')
                ) {
                    delete rule.use[2].options.minimize;
                }

                return rule;
            });

            return config;
        }
    }],
    [withLESS, {}]
], nextConfig);