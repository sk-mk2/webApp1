Vue.component('message-item', {
    props: ['message'],
    template: '<li>{{ message.text }}</li>'
});
