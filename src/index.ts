import Koa from 'koa';
import path from 'path';
import staticCache from 'koa-static-cache';
import winston from 'winston';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import 'reflect-metadata';

import { config } from './config/config';
import { logger } from './logger';
import { unprotectedRouter } from './routes/unprotectedRoutes';
import { protectedRouter } from './routes/protectedRouter';
import { cron } from './config/cron';
import { catchError } from './middleware/exception';

const app = new Koa();

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// 捕获全局异常
app.use(catchError);

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

// Enable cors with default options
app.use(cors());

// Enable bodyParser with default options
app.use(bodyParser());

app.use(
  staticCache(path.join(__dirname, '../public'), {
    // prefix: '/public'
  })
);

// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// do not protect swagger-json and swagger-html endpoints
app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

// these routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(protectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// app.use(async (ctx) => {
//   ctx.body = { name: 'Hello World 1' };
// });

// Register cron job to do any action needed
cron.start();

app.listen(config.port);
