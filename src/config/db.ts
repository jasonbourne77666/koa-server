//db
import { Sequelize } from 'sequelize';
const db = {
  database: process.env.DATABASE || '', // 使用哪个数据库
  username: process.env.DATABASE_USER || '', // 用户名
  password: process.env.DATABASE_PASS, // 口令
  host: process.env.DATABASE_URL, // 主机名
  port: process.env.DATABASE_PORT, // 端口号，MySQL默认3306
};
console.log('db', db);
// const sequelize = new Sequelize(db.database, db.username, db.password, {
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'mysql',
  dialectOptions: {
    // 字符集
    charset: 'utf8mb4',
    // collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5, // 连接池最大链接数量
    min: 0, // 最小连接数量
    idle: 10000, // 如果一个线程10秒内没有被使用的话，就释放连接池
  },
  timezone: '+08:00', // 东八时区
  logging: (log) => {
    console.log('dbLog: ', log);
    return false;
  }, // 执行过程会打印一些sql的log，设为false就不会显示
});

// 测试连接是否成功
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.log('Unable to connect to the database', err);
  });

export default sequelize;
