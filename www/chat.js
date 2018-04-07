(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", initVue);

    function initVue(){

        const app = new Vue({
            el:'#app',
            data:{
                messages: [
                {text: 'ここにメッセージが表示される'}
                ],
                str:"" 
            },
            methods: {
                async chat(){
                    if(app.str !== "") {
                        app.messages.push({text: app.str});
                        await axios.post('/chatDb', {
                            message: app.str
                        });
                    }
                    app.str = "";
                },
                async load(){
                    const res = await axios.get('/chatDb');
                    const messageArray = res.data.message;
                    for(let mes of messageArray) {
                        app.messages.push({text: mes});    
                    }
                }
            }
        });
        app.load();

    }
}).bind(null)();
