const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
app.use(views(path.join(__dirname,'views'), { map: {html: 'nunjucks'}}));
const router = new Router();

router.get('/index', async (ctx) => {
    await ctx.render('index.html');
});


router.get('/test',(ctx, next) => {
    ctx.body ='test';
});

app.use(router.routes());

app.listen(3000);

