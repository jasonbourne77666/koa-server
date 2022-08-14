import { SwaggerRouter } from 'koa-swagger-decorator';
import { user } from '../controller';

const protectedRouter = new SwaggerRouter();

// USER ROUTES
protectedRouter.post('/api/get-userinfo', user.getUserInfo);

// Swagger endpoint
protectedRouter.swagger({
  title: 'my-project',
  description: 'API DOC',
  version: '1.0.0',
  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        in: 'header',
        name: 'api_key',
      },
    },
  },
});
// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { protectedRouter };
