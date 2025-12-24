const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#372c48',
                            '@border-radius-base': '5px',
                            '@font-size-base': '16px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};