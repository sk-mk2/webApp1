const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const app = new Koa();
app.use(bodyParser());
const router = new Router();


router.post('/chatDb', (ctx, next) => {
    console.log("dbにメッセージを登録");
    ctx.response.status = 200;
    console.log(ctx.request.body);

});
router.get('/chatDb', (ctx, next) => {
    console.log("dbから今までの履歴をロード");
    ctx.body = {
        message:['hoge','fuga','piyo']
    };
    ctx.response.status = 200;

});

app.use(router.routes());


const process = {
    env:{
        PORT:''
    }
};
app.use(serve(path.join(__dirname,'/www')));
app.listen(process.env.PORT || 3000,()=>{
    console.log("listen");
});

