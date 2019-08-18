import Vue from 'vue';
import App from './App.vue';
//import axios from 'axios';
import router from './router';

Vue.config.productionTip = false

new Vue({
    router,
    template: `<App />`,
    components: {
        App
    }
}).$mount('#app');
