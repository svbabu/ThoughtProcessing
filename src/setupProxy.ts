import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

module.exports = function(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );

  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,

    })
  );
app.use(
    '/api/prod-offers/calculate',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,

    })
  );
  app.use(
    '/cart',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,


    })
  );

};
