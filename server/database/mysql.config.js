/**
 * Created by jun on 2016/4/23.
 * 数据库配置文件
 */
module.exports = {
  host: 'localhost', // 安装mysql后需要更新localhost或127.0.0.1权限才能连接
  port: '3306',
  user: 'root',
  password: 'root1234',
  database: 'cms',
  timezone: '08:00' // 解决从数据库datetime类型取数据是 2019-09-30T12:53:51.000Z 问题
}
