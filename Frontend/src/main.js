import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import StarRating from 'vue-dynamic-star-rating'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import vueSmoothScroll from 'vue2-smooth-scroll'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    inputFormat: 'YYYY-MM-DD HH:mm',
    format: 'jYYYY-jMM-jDD HH:mm',
    editable: false,
    inputClass: 'input100',
    placeholder: 'زمان تور',
    altFormat: 'YYYY-MM-DD HH:mm',
    color: 'black',
    autoSubmit: false,
    //...
    //... And whatever you want to set as default
    //...
  }
});

Vue.use(VueRouter);

// const router = new VueRouter({
//   routes: router,
//   mode: 'history'
// });

// router.replace({ name: 'login', redirect: '*' });

Vue.component('date-picker', VuePersianDatetimePicker);

Vue.use(vueSmoothScroll);
Vue.use(VueResource);
// Vue.http.options.root = 'http://37.152.185.50:8080/';
Vue.http.options.root = 'http://localhost:5000/';


Vue.component('star-rating', StarRating);

Vue.directive('click-outside',
  {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his children
        if (!(el === event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  });


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
