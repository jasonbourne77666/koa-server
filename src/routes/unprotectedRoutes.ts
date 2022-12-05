import Router from '@koa/router';
import { general, user } from '../controller';

const unprotectedRouter = new Router();

// 一般路由，非token鉴权
// user
unprotectedRouter.post('/api/register', user.register);
unprotectedRouter.post('/api/login', user.login);
unprotectedRouter.get('/api/captcha', user.captcha);

// unprotectedRouter.get('/api/', general.helloWorld);
unprotectedRouter.get('/api/banner', general.getBanner);
unprotectedRouter.get('/api/version', general.getVersion);
unprotectedRouter.get('/api/banner-detail/:id', general.bannerDetail);

export { unprotectedRouter };
