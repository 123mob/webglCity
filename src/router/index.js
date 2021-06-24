import Vue from 'vue'
import Router from 'vue-router'
// import Main from '@/views/main'
import City_babylon from '@/views/city_babylon'
import City_luma from '@/views/city_luma'
import City_three from '@/views/city_three'

Vue.use(Router)

const Main = () => import('@/views/main')
export default new Router({
    routes: [
        {
            path: '/',
            component: Main,
            redirect: '/api/city_babylon',
            children:[
            { 
              path: '/api/city_babylon', 
              component: City_babylon,
            },
            {
              path: '/api/city_luma', 
              component: City_luma,
            },
            { 
              path: '/api/city_three', 
              component: City_three,
            },
            ]
         
          },
    ]
})