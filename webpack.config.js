const
    webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');


//E N V
var PHP = process.env.PHP || false,
    NODE_ENV = process.env.NODE_ENV || 'development';
var
//P A T H S 
    serverBuildPath = path.join(__dirname, 'server', 'public'),
    //D I R S
    frontend = path.join(__dirname, 'client'),
    public = serverBuildPath;

module.exports = {

    context: frontend,
    entry: {
        app: './app.js'
    },
    output: {
        path: public,
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            'class': path.join(frontend, 'class'),
            'help': path.join(frontend,'help'),
            'service': path.join(frontend,'service'),
            'router':path.join(frontend, 'view', 'router'),
            'view': path.join(frontend,'view'),
            'root': path.join(frontend,'view','root'),
            'profile-route':path.join(frontend,'view','router','profile'),
            'auth-route':path.join(frontend,'view','router', 'auth'),
            'parts':path.join(frontend,'view','parts')
        },
        extensions: ['', '.js', '.scss', '.css', '.html', '.vue'],

    },

    devtool: NODE_ENV === 'development' ?
        'inline-cheap-module-source-map' : null,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: NODE_ENV === 'development' ?
                'style!css!sass?sourceMap' : ExtractTextPlugin.extract(
                    'css!autoprefixer?browsers=last 2 versions!sass'
                )
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }]
    },

    vue: {
        loader: {
            js: 'babel?presets[]=es2015'
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            USER: JSON.stringify({
                name: 'stas',
                age: '26',
                music: ['guitar', 'viola']
            }),
            Application: JSON.stringify({
                key: 'secret'
            })
        }),
        new webpack.ProvidePlugin({
            logger: path.join(frontend, 'help', 'logger.js'),
            Vue: 'vue'
        })

    ],
    devServer: {
        contentBase: public,
        proxy: {
            '*': 'http://localhost:3000/'
        }
    }
};



if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
    // module.exports.plugins.push(
    //     new ExtractTextPlugin('style.css')
    // );
}
