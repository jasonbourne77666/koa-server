import { Context, Next } from 'koa';
import { validateOrReject, ValidationError } from 'class-validator';
import { resJson } from '../utils/resJson';
import { getErrorMsg } from '../utils/utils';
import { ParameterException, HttpException } from '../utils/http-exception';
import User, { userSchema, validatorUser } from '../model/user';

import {
  description,
  request,
  summary,
  tagsAll,
  path,
  body
} from 'koa-swagger-decorator';

@tagsAll(['User'])
export default class UserController {
  /**
   * 注册
   */
  @request('post', '/register')
  @summary('register user')
  @body(userSchema)
  public static async register(ctx: Context): Promise<void> {
    try {
      const { username, password, email, phone, birth, sex } = ctx.request.body;
      const body = new validatorUser();
      body.username = username;
      body.password = password;
      body.email = email;
      body.phone = phone;
      body.birth = birth;
      body.sex = sex;

      const result = await validateOrReject(body);

      if (Array.isArray(result) && result.length) {
        const msg = getErrorMsg(result[0]);
        throw new ParameterException(msg);
      }

      const user = User.build({
        ...body
      });
      await user.save();

      ctx.body = resJson.success({ msg: '注册成功!' });
    } catch (error: any) {
      let msg = error.message;
      if (Array.isArray(error) && error.length) {
        msg = getErrorMsg(error[0]);
      }
      throw new ParameterException(msg);
    }
  }

  @request('get', 'getAllUsers')
  @summary('get All Users')
  public static async getAllUsers(ctx: Context): Promise<void> {
    await User.findAll({
      raw: true,
      attributes: {
        // 不返回password字段
        exclude: ['password']
      }
    })
      .then((res) => {
        console.log(res);
        // 成功返回
        ctx.body = 'resJson.success({ data: res })';
      })
      .catch((err) => {
        console.log(err);
        // 失败，捕获异常并输出
        ctx.body = 'resJson.fail(err)';
      });
  }
  public static async createUser(ctx: Context): Promise<void> {
    const user = User.build({
      name: 'norman',
      password: '123456',
      email: '422685598@qq.com',
      phone: 13980517892,
      birth: '1992/06/30',
      sex: 0
    });
    await user.save();
    ctx.body = 'resJson.success({ data: res })';
  }
}
