import Router from '@koa/router';
import { general, user } from '../controller';

const unprotectedRouter = new Router();

// 一般路由，非token鉴权
// user
unprotectedRouter.post('/register', user.register);
unprotectedRouter.post('/login', user.login);

// unprotectedRouter.get('/', general.helloWorld);
unprotectedRouter.get('/banner', general.getBanner);
unprotectedRouter.get('/banner-detail/:id', general.bannerDetail);

export { unprotectedRouter };
