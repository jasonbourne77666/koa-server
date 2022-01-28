// utils/http-exception.js
/**
 * 默认的异常
 */

export class HttpException extends Error {
  errorCode?: number;
  code?: number;
  msg?: string;

  constructor(msg = '错误请求', errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}

export class ParameterException extends HttpException {
  constructor(msg?: string, errorCode?: number) {
    super();
    this.code = 400;
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }
}

export class AuthFailed extends HttpException {
  constructor(msg?: string, errorCode?: number) {
    super();
    this.code = 401;
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10004;
  }
}

export class NotFound extends HttpException {
  constructor(msg?: string, errorCode?: number) {
    super();
    this.code = 404;
    this.msg = msg || '未找到该资源';
    this.errorCode = errorCode || 10005;
  }
}

export class Forbidden extends HttpException {
  constructor(msg?: string, errorCode?: number) {
    super();
    this.code = 403;
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
  }
}

export class Oversize extends HttpException {
  constructor(msg?: string, errorCode?: number) {
    super();
    this.code = 413;
    this.msg = msg || '上传文件过大';
    this.errorCode = errorCode || 10007;
  }
}

export class InternalServerError extends HttpException {
  constructor(msg?: string, errorCode?: number) {
    super();
    this.code = 500;
    this.msg = msg || '服务器出错';
    this.errorCode = errorCode || 10008;
  }
}
