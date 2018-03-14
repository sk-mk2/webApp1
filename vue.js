(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", initVue);
    function initVue(){
        const app = new Vue({
            el:'#app',
            data:{
                messages: [
                {text: 'Chat'}
                ],
                str:"" 
            },
            methods: {
                chat(){
                    if(app.str !== "")
                    app.messages.push({text: app.str});
                    app.str = "";
                }
            }
        });
    }
}).bind(null)();
