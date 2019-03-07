// module.exports = {
//     devServer: {
//         proxy: 'http://47.107.67.63:9500/'
//     }
// }

const env = process.env.NODE_ENV
module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? '' : '',
    outputDir: env === 'production' ? 'dist/official' : env === 'pre' ? 'dist/pre' : env === 'test' ? 'dist/test' : '/dist_serve',
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