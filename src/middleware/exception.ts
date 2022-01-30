// middleware/exception.js
import { Context, Next } from 'koa';
import {} from 'koa-jwt';
import { HttpException, AuthFailed } from '../utils/http-exception';
import { resJson } from '../utils/resJson';
import { HttpStatus } from '../config/httpStatus';

// 全局异常监听
export const catchError = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error: any) {
    // 已知异常
    const isHttpException = error instanceof HttpException;
    // 401验证异常
    const { status } = error;
    // 开发环境
    const isDev = process.env.NODE_ENV === 'development';

    // 在控制台显示未知异常信息：开发环境下，不是HttpException 抛出异常
    if (!isDev && !isHttpException) {
      throw error;
    }

    /**
     * 是已知错误，还是未知错误
     * 返回：
     *      msg 错误信息
     *      error_code 错误码
     */
    if (isHttpException) {
      ctx.body = resJson.fail(error);
      // ctx.response.status = 200;
    } else if (status === HttpStatus.AUTHFAILED) {
      // 验证失败，需要token权限
      ctx.body = resJson.fail(new AuthFailed('登陆失效'));
      // ctx.response.status = 200;
    } else {
      console.log('error', error);
      ctx.body = resJson.fail({
        msg: '未知错误',
        code: 9999
      });
      // ctx.response.status = 200;
    }
  }
};
