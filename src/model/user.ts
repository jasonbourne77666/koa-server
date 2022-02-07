import Sequelize from 'sequelize';
import sequelize from '../config/db';

import {
  IsEmpty,
  IsInt,
  Length,
  IsEmail,
  IsDate,
  IsMobilePhone
} from 'class-validator';

export class validatorLogin {
  @Length(6, 12, {
    message: '用户名长度6-12位'
  })
  username!: string;

  @Length(6, 12, {
    message: '密码长度6-12位'
  })
  password!: string;

  @Length(4, 6, {
    message: '验证码不正确'
  })
  captcha!: string;
}

export class validatorUser {
  @Length(6, 12, {
    message: '用户名长度6-12位'
  })
  username!: string;

  @Length(6, 12, {
    message: '密码长度6-12位'
  })
  password!: string;

  @IsEmail({}, { message: '请输入正确的邮箱' })
  email!: string;

  @Length(4, 6, {
    message: '验证码不正确'
  })
  captcha!: string;

  @IsMobilePhone()
  @Length(11, 11, {
    message: '请输入正确的手机号'
  })
  phone!: string | number;

  // @IsDate({ message: '生日格式不正确' })
  birth?: Date;

  // @IsInt({ message: '性别格式不正确' })
  sex?: number;
}

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: 'ID', // 字段描述（自1.7+后，此描述不再添加到数据库中
      autoIncrement: true, // 是否自增
      primaryKey: true, // 指定是否是主键
      unique: true // 设置为true时，会为列添加唯一约束
    },
    username: {
      type: Sequelize.STRING(20),
      validate: {
        notEmpty: true
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: '用户名称', // 字段描述（自1.7+后，此描述不再添加到数据库中）
      unique: true
    },
    password: {
      type: Sequelize.STRING(20),
      validate: {
        notNull: {
          msg: '不能为空'
        }
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: '密码' // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
    email: {
      type: Sequelize.STRING(20),
      validate: {
        isEmail: true
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: 'email' // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
    phone: {
      type: Sequelize.STRING(11),
      allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      comment: '手机号码' // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
    birth: {
      type: Sequelize.DATE,
      validate: {
        isDate: true
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: true, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      defaultValue: null, // 字面默认值, JavaScript函数, 或一个 SQL 函数
      comment: '生日' // 字段描述（自1.7+后，此描述不再添加到数据库中）
    },
    sex: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true
        // len: 1
      }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
      allowNull: true, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
      defaultValue: null, // 字面默认值, JavaScript函数, 或一个 SQL 函数
      comment: '性别，0-男 1-女' // 字段描述（自1.7+后，此描述不再添加到数据库中）
    }
  },
  {
    freezeTableName: true, // 设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: true // 为模型添加 createdAt 和 updatedAt 两个时间戳字段
  }
);

// swagger 用
export const userSchema = {
  id: { type: 'number', required: true, example: 1 },
  name: { type: 'string', required: true, example: 'Javier' },
  password: { type: 'string', required: true, example: 'Javier' },
  email: {
    type: 'string',
    required: true,
    example: 'avileslopez.javier@gmail.com'
  },
  phone: {
    type: 'string',
    required: true,
    example: '13344443333'
  },
  birth: {
    type: 'date',
    required: true,
    example: '13344443333'
  },
  sex: {
    type: 'string',
    required: true,
    example: '0'
  }
};

//创建表，默认是false，true则是删除原有表，再创建
// User.sync({
//   force: false
// });

export default User;
