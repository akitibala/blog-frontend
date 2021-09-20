import Vue from 'vue'
import VueRouter  from 'vue-router'
import Home  from  '../views/Home.vue'
import PostBlog from '../views/PostBlog.vue'
// import NotFound from '../views/NotFound.vue'
import SearchBlogs from '../views/SearchBlogs.vue'
// import Login from '../views/Login.vue'
// import App from '../App.vue'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
      // {
      //   path: "/",
      //   redirect:{
      //   name: "Login",
      //   component:Login ,
      //   }
      //   // name:"App",
      //   // component:App
      // },

      {
        path: "/home",
        name: "Home",
        component:Home ,
        props:true,
      },
      {
        path: "/posts",
        name: "Blog",
        component:PostBlog,
        props:true,
      },
      {
        path: "/search-blogs",
        name: "SearchBlogs",
        component:SearchBlogs,
        props:true,
      }
      // {
      //   path: "/login",
      //   name: "Login",
      //   component: Login,
      // },
    ],
  });