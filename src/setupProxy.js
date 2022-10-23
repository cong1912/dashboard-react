const {creteProxyMiddleware } = require('http-proxy-middleware')

module.exports=app=>{
    app.use(
      creteProxyMiddleware('/auth/login', {
        target: 'http://157.230.212.40:8000',
        changeOrigin: true
      })
    );
}