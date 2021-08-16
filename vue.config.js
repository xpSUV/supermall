// 如果要新添加一些配置 新建一个文件vue.config.js来添加额外的配置  然后导入到已配置的文件中
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 在脚手架3中已经默认配置过‘@’ = ‘src’ 了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        // vue中的文件 可以通过this.$router  this.$store来获取router跟store 所以此处不设置别名
      }
    }
  }
}