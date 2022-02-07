import { Context, Next } from 'koa';
import { validateOrReject, validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import { resJson } from '../utils/resJson';
import { config } from '../config/config';
import { HttpStatus } from '../config/httpStatus';
import { getErrorMsg } from '../utils/utils';
import { ParameterException, AuthFailed } from '../utils/http-exception';
import User, { userSchema, validatorUser, validatorLogin } from '../model/user';

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
    const { username, password, email, phone, birth, sex, captcha } =
      ctx.request.body;
    const sessionCaptcha = ctx.session?.captcha ?? '';

    const body = new validatorUser();
    body.username = username;
    body.password = password;
    body.email = email;
    body.phone = phone;
    body.birth = birth;
    body.sex = sex;
    body.captcha = captcha;

    try {
      const result = await validateOrReject(body);
    } catch (error: any) {
      let msg = error.message;
      if (Array.isArray(error) && error.length) {
        msg = getErrorMsg(error[0]);
      }
      throw new ParameterException(msg);
    }

    if (sessionCaptcha.toLocaleLowerCase() !== captcha.toLocaleLowerCase()) {
      throw new ParameterException('验证码不正确');
    }

    // 检查是否重复
    const findUser = await UserController.getUser(body.username);
    if (findUser) {
      throw new ParameterException('用户名已存在!');
    }

    const user = User.build({
      ...body
    });
    const userInfo = await user.save();
    const token = jwt.sign({ ...userInfo }, config.jwtSecret, {
      expiresIn: '1h'
    });
    ctx.body = resJson.success({
      msg: '注册成功!',
      data: { ...userInfo, token }
    });
  }

  /**
   * 获取用户
   */
  @request('get', 'getUserInfo')
  @summary('get user info by id')
  public static async getUser(username: string, needPass?: boolean) {
    const attributes = needPass ? [] : ['password'];
    const result = await User.findOne({
      where: { username },
      raw: true,
      attributes: {
        // 不返回password字段
        exclude: [...attributes]
      }
    });

    return result;
  }

  /**
   * 获取用户信息
   */
  @request('get', 'getUserInfo')
  @summary('get user info by id')
  public static async getUserInfo(ctx: Context): Promise<void> {
    let authorization = ctx.request.headers?.authorization ?? '';
    authorization = (authorization as string).split('Bearer ')[1];
    const userinfo = jwt.decode(authorization);
    let username;
    if (userinfo) {
      username = (userinfo as any).username || '';
    }

    if (!userinfo || !username) {
      throw new AuthFailed();
    }
    const findUser = await UserController.getUser(username);
    if (findUser) {
      ctx.body = resJson.success({ msg: '请求成功!', data: findUser });
    }
  }

  /**
   * 登陆
   */
  public static async login(ctx: Context): Promise<void> {
    const { username, password, captcha } = ctx.request.body;
    const sessionCaptcha = ctx.session?.captcha ?? '';

    const body = new validatorLogin();
    body.username = username;
    body.password = password;
    body.captcha = captcha;

    try {
      const result = await validateOrReject(body);
    } catch (error: any) {
      let msg = error.message;
      if (Array.isArray(error) && error.length) {
        msg = getErrorMsg(error[0]);
      }
      throw new ParameterException(msg);
    }

    if (sessionCaptcha.toLocaleLowerCase() !== captcha.toLocaleLowerCase()) {
      throw new ParameterException('验证码不正确');
    }

    // 检查密码
    const findUser: any = await UserController.getUser(body.username, true);
    // if (!findUser) {
    //   throw new ParameterException('用户名不存在!');
    // } else
    if (findUser && findUser.password === body.password) {
      const { password, id, ...userinfo } = findUser;
      const token = jwt.sign({ ...userinfo }, config.jwtSecret, {
        expiresIn: '1h'
      });
      ctx.body = resJson.success({
        msg: '登陆成功!',
        code: HttpStatus.SUCCESS,
        data: { ...userinfo, token }
      });
      return;
    }

    throw new ParameterException('用户名或密码错误!');
  }

  /**
   * 验证码
   */
  public static async captcha(ctx: Context): Promise<void> {
    var captcha = svgCaptcha.create({
      size: 4, //验证码个数
      fontSize: 50, //验证码字体大小
      width: 100, //宽度
      height: 40,
      background: '#cc9966' //背景大小'
    });
    // ctx.response.sess;
    ctx.session!.captcha = captcha.text;
    console.log('ctx.session!.captcha', ctx.session!.captcha);
    ctx.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}
