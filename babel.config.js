module.exports = api => {
    api.cache(true)

    return {
        presets: ['next/babel', '@zeit/next-typescript/babel'],
        plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ['module-resolver', { root: './', alias: {'@': './'} } ]
        ]
    }
}