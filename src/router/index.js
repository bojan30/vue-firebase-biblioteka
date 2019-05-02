import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Dashboard from '@/components/Dashboard'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    //route za sve nepravilno ukucane, redirect na dashboard
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

//provera autentikacije, sprecavanje da se udje na glavnu stranicu ako nije ulogovan korisnik
router.beforeEach((to, from, next) => {
  //provera da li postoji putanja koja zahteva autentikaciju
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  //provera da li je ulogovan korisnik
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router;
