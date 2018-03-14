const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');
const test = require('./routes/test.js');
const app = new Koa();
app.use(views(path.join(__dirname,'views'), { map: {html: 'nunjucks'}}));
const router = new Router();

router.get('/index', async (ctx) => {
    await ctx.render('index.html');
});

router.get('/', async (ctx) => {
    await ctx.render('index.html',{
        title:"最初のページ"
    });
});

router.get('/chat', async (ctx) => {
});

router.post('/chat', async (ctx) => {
});

router.get('/test', (ctx) => {
    test(ctx);
});



app.use(router.routes());


const process = {
    env:{
        PORT:''
    }
};

app.listen(process.env.PORT || 3000,()=>{
    console.log("listen");
});

