const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path  =  require('path');

const PATHS  =  {
    public:  path.resolve(__dirname, 'src'),
};

module.exports = {
    entry: `${PATHS.public}/main.js`,

    plugins: [
        new Dotenv()
    ]
};