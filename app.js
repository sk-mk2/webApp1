const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const app = new Koa();
const router = new Router();

router.post('/chat', async (ctx) => {
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

