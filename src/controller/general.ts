import { BaseContext, Context } from 'koa';
import {
  description,
  request,
  summary,
  tagsAll,
  path,
  body
} from 'koa-swagger-decorator';

@tagsAll(['General'])
export default class GeneralController {
  @request('get', '/')
  @summary('Welcome page')
  @description(
    'A simple welcome message to verify the service is up and running.'
  )
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = 'Hello World!';
  }

  @request('get', '/banner')
  @summary('Welcome page')
  @description(
    'A simple welcome message to verify the service is up and running.'
  )
  public static async getBanner(ctx: BaseContext): Promise<void> {
    ctx.body = 'getBanner';
  }

  @request('get', '/banner-detail/{id}')
  @summary('get banner detail')
  @path({
    id: { type: 'number', required: true, description: 'id of user' }
  })
  @body({ type: 'number', required: true, example: 1 })
  public static async bannerDetail(ctx: Context): Promise<void> {
    const id = +ctx.params.id || 0; // will always have a number, this will avoid errors
    ctx.body = id;
  }
}
