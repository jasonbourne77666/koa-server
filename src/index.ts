import Koa from 'koa';
import path from 'path';
import staticCache from 'koa-static-cache';
import { unprotectedRouter } from './routes/unprotectedRoutes';
import { protectedRouter } from './routes/protectedRouter';
const app = new Koa();

app.use(
  staticCache(path.join(__dirname, '../public'), {
    // prefix: '/public'
  })
);

// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
app.use(protectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// app.use(async (ctx) => {
//   ctx.body = { name: 'Hello World 1' };
// });

app.listen(3000);
