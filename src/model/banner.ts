import Sequelize from 'sequelize';
import sequelize from '../config/db';

const Banner = sequelize.define(
  'banner',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: 'ID', // 字段描述（自1.7+后，此描述不再添加到数据库中
      autoIncrement: true, // 是否自增
      primaryKey: true, // 指定是否是主键
      unique: true, // 设置为true时，会为列添加唯一约束
    },
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '不能为空',
        },
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: '用户名称', // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
    img: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '不能为空',
        },
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: '密码', // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
    link: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '不能为空',
        },
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: '连接', // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
  },
  {
    freezeTableName: true, // 设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: true, // 为模型添加 createdAt 和 updatedAt 两个时间戳字段
  }
);

export default Banner;
