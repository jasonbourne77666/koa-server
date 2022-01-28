import Koa from 'koa';
import path from 'path';
import staticCache from 'koa-static-cache';
import winston from 'winston';
import helmet from 'koa-helmet';
import { config } from './config/config';
import { logger } from './logger';
import { unprotectedRouter } from './routes/unprotectedRoutes';
import { protectedRouter } from './routes/protectedRouter';
const app = new Koa();

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// Provides important security headers to make your app more secure
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'cdnjs.cloudflare.com',
        'fonts.googleapis.com'
      ],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'online.swagger.io', 'validator.swagger.io']
    }
  })
);

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

app.listen(config.port);
