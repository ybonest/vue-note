import vueRouter from 'vue-router'

import home from './components/tabbars/home.vue'
import cart from './components/tabbars/cart.vue'
import member from './components/tabbars/member.vue'
import search from './components/tabbars/search.vue'

const newslist = () => import(/* webpackChunkName: "news" */ './components/news/NewsList.vue')
const newsinfo = () => import(/* webpackChunkName: "news" */ './components/news/newsInfo.vue')
// import newslist from './components/news/NewsList.vue'
// import newsinfo from './components/news/newsInfo.vue'

const photolist = () => import(/* webpackChunkName: "news" */ './components/photo/photolist.vue')
const photoinfo = () => import(/* webpackChunkName: "news" */ './components/photo/photoinfo.vue')

// import photolist from './components/photo/photolist.vue'
// import photoinfo from './components/photo/photoinfo.vue'

const goodlist = () => import(/* webpackChunkName: "news" */ './components/goods/goodlist.vue')
const goofsinfo = () => import(/* webpackChunkName: "news" */ './components/goods/goodsinfo.vue')
const goodscmt = () => import(/* webpackChunkName: "news" */ './components/goods/goodscmt.vue')
const imgdesc = () => import(/* webpackChunkName: "news" */ './components/goods/imgdesc.vue')

// import goodlist from './components/goods/goodlist.vue'
// import goofsinfo from './components/goods/goodsinfo.vue'
// import goodscmt from './components/goods/goodscmt.vue'
// import imgdesc from './components/goods/imgdesc.vue'

const router = new vueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/cart', component: cart },
    { path: '/member', component: member },
    { path: '/search', component: search },
    { path: '/home/newslist', component: newslist },
    { path: '/home/getnewsinfo/:id', component: newsinfo, props: true },
    { path: '/home/photolist', component: photolist },
    { path: '/home/photoinfo/:id', component: photoinfo, props: true },
    { path: '/home/goodlist', component: goodlist, props: true },
    { path: '/home/goofsinfo/:id', component: goofsinfo, props: true },
    { path: '/home/goodscmt/:id', component: goodscmt, props: true },
    { path: '/home/imgdesc/:id', component: imgdesc, props: true }
  ],
  linkActiveClass: 'mui-active'
})

export default router