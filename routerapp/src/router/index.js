import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Me from '../views/Me.vue';
import list from '../views/list.vue';

import News from '../views/News.vue';
import Weather from '../views/Weather.vue';
import BigNews from '@/views/BigNews';

import VideoView from '@/components/VideoView';
import TextView from '@/components/TextView';
import ImageView from '@/components/ImageView';

import navView from '@/components/nav';
import asideView from '@/components/aside';

import Page404 from '@/views/Page404';
import Login from '@/views/Login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      needlogin: true,
      isAuth: true,
      content:'这是首页'
    },
    components: {
      nav: navView,
      aside: asideView,
      default: Home
    }
  },
  {
    path: '/a',
    name: 'A',
    // redirect:'/about'  //重定向
    redirect: (to) => {
      console.log('to', to)

      if (to.query.go == 'about') {
        return { name: 'About' }
      } else {
        return { name: 'News', params: { id: 3214445 } }
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // beforeEnter:(to,from,next)=>{
    //   console.log('/about独享事件')
    //     let isLogin = false;
    //     if (isLogin || to.path == '/login') {
    //       next()
    //     } else {
    //       next({
    //         path: '/login'
    //       })
    //     }
    // },
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/me',
    name: 'Me',
    alias: '/self',  //别名
    component: () => import(/* webpackChunkName: "about" */ '../views/Me.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: list,
  },
  {
    path: '/news/:id',
    name: 'News',
    // props: true,    //通过props组件化的参数来传参
    props:function(route){
      console.log('route',route)
      return {
        id: route.params.id,
        username: route.query.username
      }
    },

    component: News
  },
  {
    path: '/weather/:city/:area',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/bigNews/:content',
    name: 'BigNews',
    component: BigNews,
    children: [
      {
        path: 'video',
        name: 'VideoView',
        component: VideoView
      },
      {
        path: 'text',
        name: 'TextView',
        component: TextView
      },
      {
        path: 'image',
        name: 'ImageView',
        component: ImageView
      }
    ]

  },
  {
    path: '*',
    component: Page404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to , from , savedPosition){
    if(to.path=='/list'){
      console.log('savedPosition',savedPosition)
      // return {
      //   x: 0, 
      //   y: savedPosition.y / 2
      // }
      // setTimeout(()=>{
      //   window.scrollTo(0, savedPosition.y)
      // },2000)
      return savedPosition
    }
    //return 期望滚动到哪个位置
  }
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach............................')
  console.log('from:',from, 'to:',to)

  // next() //跳转    next(false)  //不跳转
  let isLogin = false;

  if (to.meta.requiresAuth && !isLogin) {
    //我需要登录，但是还没有登录，就跳转到登录页面
    next({
      path: '/login'
    })
  } else {
    next()
  }
  
})

// router.afterEach((to, from) => {
//   console.log('afterEach............................')
//   console.log(from, to)
// })

// router.onError((error) => {
//   console.log('error............................')
//   console.log(error)
// })



export default router
