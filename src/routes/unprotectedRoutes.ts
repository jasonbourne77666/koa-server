import Router from '@koa/router';
import { general } from '../controller';

const unprotectedRouter = new Router();

// 一般路由，非token鉴权
// unprotectedRouter.get('/', general.helloWorld);
unprotectedRouter.get('/banner', general.getBanner);
unprotectedRouter.get('/banner-detail/:id', general.bannerDetail);

export { unprotectedRouter };
