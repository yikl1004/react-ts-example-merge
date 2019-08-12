const withPlugins = require('next-compose-plugins');
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
    [withCSS, {}]
], nextConfig);