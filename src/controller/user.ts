import { Context, Next } from 'koa';

import User from '../model/user';

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
