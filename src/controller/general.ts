import { BaseContext, Context } from 'koa';
import semver from 'semver';
import { description, request, summary, tagsAll, path, body } from 'koa-swagger-decorator';
import { resJson } from '../utils/resJson';
import { HttpStatus } from '../config/httpStatus';

@tagsAll(['General'])
export default class GeneralController {
  @request('get', '/')
  @summary('Welcome page')
  @description('A simple welcome message to verify the service is up and running.')
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = 'Hello World!';
  }

  // 测试jsonp
  @request('get', '/api/jsonp')
  @summary('Welcome page')
  @description('A simple welcome message to test jsonp.')
  public static async testJsonp(ctx: BaseContext): Promise<void> {
    let { wd, callback } = ctx.query;
    console.log(wd);
    console.log(callback);
    ctx.body = `${callback}('Hello World!')`;
  }

  // 测试uniapp 版本迭代
  @request('get', '/version')
  @summary('Welcome page')
  @description('get versions for app')
  public static async getVersion(ctx: Context): Promise<void> {
    const latestVersion = '1.0.1';
    // 整包更新版本
    const allVersion = '';
    const { appVersion: currentVersion, appid, platform } = (ctx.request.query as any) || {};
    // 热更新
    const isHotUpdate = latestVersion && semver.gt(latestVersion, currentVersion);
    // 整包更新
    const forceUpdate = allVersion && semver.gt(allVersion, currentVersion);
    let resData = {
      update: false,
      wgtUrl: '',
      pkgUrl: '',
      platform,
      latestVersion,
    };
    if (forceUpdate) {
      resData = {
        update: true,
        wgtUrl: '',
        pkgUrl: '',
        platform,
        latestVersion,
      };
    } else if (isHotUpdate) {
      resData = {
        update: true,
        wgtUrl: 'http://192.168.3.9:7001/static/__UNI__3594730.wgt',
        pkgUrl: '',
        platform,
        latestVersion,
      };
    }

    ctx.body = resJson.success({
      msg: '请求成功!',
      code: HttpStatus.SUCCESS,
      data: resData,
    });
  }

  // 普通get请求
  @request('get', '/banner')
  @summary('Welcome page')
  @description('A simple welcome message to verify the service is up and running.')
  public static async getBanner(ctx: BaseContext): Promise<void> {
    ctx.body = resJson.success({
      msg: '登录成功!',
      code: HttpStatus.SUCCESS,
      data: [
        {
          title: '网络头像测试1',
          img: 'https://img1.baidu.com/it/u=4216761644,15569246&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
        },
        {
          title: '网络头像测试2',
          img: 'https://img0.baidu.com/it/u=2106001853,3367829453&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        },
      ],
    });
  }

  @request('get', '/banner-detail/{id}')
  @summary('get banner detail')
  @path({
    id: { type: 'number', required: true, description: 'id of banner' },
  })
  @body({ type: 'number', required: true, example: 1 })
  public static async bannerDetail(ctx: Context): Promise<void> {
    const id = +ctx.params.id || 0; // will always have a number, this will avoid errors
    ctx.body = id;
  }
}
