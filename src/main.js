
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;

//stanje aplikacije posle reload-a stranice
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
