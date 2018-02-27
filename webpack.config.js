const {join} = require('path')

module.exports = {
    entry : './src/index.js',
    output: {
        path: join(__dirname, 'dist'),
        filename : "bundle.js"
    },
    
    devServer : {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 8090,
        hot : true,
        after(app){
           console.log('after')
          }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use : 'babel-loader'
            }
        ]
    }
}