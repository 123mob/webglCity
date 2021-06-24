
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './', //这个路径根据自己的情况定，默认就填"./",因为我静态资源的路径必须要在static文件夹下，所以才修改的。
    devServer: {  //配置服务器的，添加之后使用npm run dev会自动打开页面
        open: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}