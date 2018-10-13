import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/:id', name: 'Main', component: Main },
  ],
});
