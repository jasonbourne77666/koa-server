interface ParamType {
  data?: any; // 返回的数据
  msg?: string; // 返回的提示信息
  code?: number;
  error_code?: number;
}

export const resJson = {
  success: (params: ParamType) => {
    return {
      data: params.data || null, // 返回的数据
      msg: params.msg || '请求成功', // 返回的提示信息
      code: 1 // 返回的接口调用状态码，0-失败，1-成功
    };
  },
  fail: (params: ParamType) => {
    return {
      data: params.data || null,
      msg: params.msg || '操作失败',
      code: 0,
      error_code: params.error_code // 返回接口异常信息码
    };
  }
};
