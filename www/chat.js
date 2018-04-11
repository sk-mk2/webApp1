(function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", initVue);
    function initVue(){

        const app = new Vue({
            el:'#app',
            data:{
                myMessages: [],
                aiMessages: [],
                historyMessages: [],
                str:"" 
            },
            created: async()=>{
                const res = await axios.get('/chatDb');
                const messageArray = res.data.message;
                for(let mes of messageArray) {
                    app.historyMessages.push({text: mes});    
                }
            },
            methods: {
                async chat(){
                    if(app.str !== "") {
                        const mess = app.str;
                        app.str = "";
                        app.myMessages.push({text: mess});
                        await axios.post('/chatDb', {
                            message: mess
                        });
                        app.aiMessages.push({text: await talkAI(mess)});
                    }
                }
            }
        });
    }
    async function talkAI(mess){
        const res = await axios.get('/talk',{
            params: {
                text: mess
            }
        });   
        return res.data;
    }
}).bind(null)();
