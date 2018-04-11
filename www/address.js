(function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", initVue);
    function initVue(){
        const app = new Vue({
            el:'#app2',
            data:{
                address: 'ここに住所が表示されます',
                postalCode: '' 
            },
            methods: {
                async search(){
                    if(app.postalCode.length !== 7){
                        app.address = '7桁で入力してください';
                        return;
                    }
                    const res = await axios.get('http://api.zipaddress.net/',{
                            params: {
                                zipcode:app.postalCode
                            }
                            });
                    app.address = res.data.code === 200 ? 
                        res.data.data.fullAddress :
                        '郵便番号に対応する住所が見つかりません';
                }
            }
        });
    }
}).bind(null)();
