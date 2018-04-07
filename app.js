(async function(){
    'use strict';
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const app = new Koa();
app.use(bodyParser());
const router = new Router();
const DB = await require('./orm/defineDB.js');
const sequelize = DB.sequelize;
const AI = require('./lib/talkAPI.js');

router.post('/chatDb', (ctx, next) => {
    console.log("dbにメッセージを登録");
    const Message = sequelize.import('./orm/models/message.js');
    Message.create({
        mess: ctx.request.body.message
    });
    ctx.response.status = 200;
    console.log(ctx.request.body);
});

router.get('/chatDb', async (ctx, next) => {
    console.log("dbから今までの履歴をロード");
    const Message = sequelize.import('./orm/models/message.js');
    const Op = sequelize.Op;
    const id = await Message.max('id')-10;
    const messages = JSON.parse(JSON.stringify(await Message.findAll({
        where:{
            id: {
                [Op.gt]:id
            }
        }
    })));
    let messArray = [];
    for(let arr of messages){
        messArray.push(arr.mess);
    }
    ctx.body = {
        message: messArray
    };
    ctx.response.status = 200;

});

router.get('/talk',async (ctx, next) => {
    const text = await AI.talk(ctx.request.query.text);
    ctx.body = text;
});



app.use(router.routes());

//herokuで動かす時用
const process = {
    env:{
        PORT:''
    }
};

app.use(serve(path.join(__dirname,'/www')));
app.listen(process.env.PORT || 3000,()=>{
    console.log("listen");
});
}).bind(null)();
