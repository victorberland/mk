import Vue from 'vue';
import Router from 'vue-router';
import FrontPage from '../views/FrontPage';
import Category from '../views/Category';
import Page from '../views/Page';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'frontpage',
      path: '/',
      component: FrontPage
    }, {
      name: 'Category',
      path: '/:slug',
      component: Category
    }, {
      name: 'Page',
      path: '/:category/:slug',
      component: Page
    }, {
      name: '404',
      path: '*',
      component: FrontPage
    }
  ]
});
