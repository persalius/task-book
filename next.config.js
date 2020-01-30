module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

const withCSS = require('@zeit/next-css')
module.exports = withCSS();

// Sass
const withSass = require('@zeit/next-sass')
module.exports = withSass();
