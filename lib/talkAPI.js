module.exports = (function(){
    const talkApiKey = require('./apiKey.js').talkApiKey;
    const AI = {};
    AI.talk = (text) => {
        return new Promise((resolve, reject) => {
            const request = require('request');
            const reply = request.post({
                uri: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
                headers: {
                    'content-type': 'application/json'
                },
                json:true,
                form: {
                    apikey: talkApiKey,
                    query:text
                }
            },(err,res,body)=>{
                console.log(body);
                resolve(body.results[0].reply);
            });
        });
    }
    return AI;
}).bind(null)();
