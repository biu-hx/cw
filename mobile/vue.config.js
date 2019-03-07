// module.exports = {
//     devServer: {
//         proxy: 'http://47.107.67.63:9500/'
//     }
// }


let NODE_ENV = process.env.NODE_ENV

module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? '' : '',
    outputDir: NODE_ENV === 'production' ? 'dist/official' : NODE_ENV === 'pre' ? 'dist/pre' : NODE_ENV === 'test' ? 'dist/test' : '/dist_serve',
    devServer: {
        proxy: {
            '/': {
                target: 'https://cw-api.modelwiser.com/',
                ws: false,
                // changeOrigin: true
            }
        }
    }
}