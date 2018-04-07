(function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", initVue);
    function initVue(){
        const app = new Vue({
            el:'#app',
            data:{
                myMessages: [],
                aiMessages: [],
                str:"" 
            },
            methods: {
                async chat(){
                    if(app.str !== "") {
                        app.myMessages.push({text: app.str});
                        await axios.post('/chatDb', {
                            message: app.str
                        });
                        const res = await axios.get('/talk',{
                            params: {
                                text: app.str
                            }
                        });   
                        app.aiMessages.push({text: res.data});
                    }
                    app.str = "";
                },
                async load(){
                    const res = await axios.get('/chatDb');
                    const messageArray = res.data.message;
                    for(let mes of messageArray) {
                        app.myMessages.push({text: mes});    
                    }
                }
            }
        });
        app.load();
    }
}).bind(null)();
