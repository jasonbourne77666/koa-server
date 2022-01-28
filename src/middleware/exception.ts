// middleware/exception.js
import { Context, Next } from 'koa';
import { HttpException, ParameterException } from '../utils/http-exception';
import { resJson } from '../utils/resJson';

// 全局异常监听
export const catchError = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error: any) {
    // 已知异常
    const isHttpException = error instanceof HttpException;
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
      ctx.response.status = 200;
    } else {
      ctx.body = resJson.fail({
        msg: '未知错误',
        error_code: 9999
      });
      ctx.response.status = 500;
    }
  }
};
