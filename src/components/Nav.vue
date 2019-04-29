<template>
  <div class="nav">
    <div class = "logo">
      <router-link v-bind:to = "{name: 'Dashboard'}"><i class="fas fa-book"></i>My Library</router-link>
    </div>
    <ul class="navbar">
      <li v-if = "!getCurrentUser" class = "nav-item"><router-link class = "nav-link" v-bind:to = "{name: 'Login'}">Login</router-link></li>
      <li v-if = "!getCurrentUser" class="nav-item"><router-link class = "nav-link" v-bind:to = "{name: 'Signup'}">Sign up</router-link></li>
      <li v-if = "getCurrentUser" class="nav-item username"><i class = "fas fa-user"></i>{{getUserProfile.username}}</li>
      <li v-if = "getCurrentUser" class="nav-item"><a v-on:click.prevent = "logout" href = "" class = "nav-link">Logout</a></li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase/init'
import {mapGetters} from 'vuex'
export default {
  name: 'Nav',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser','getUserProfile'])
  },
  methods: {
    logout(){
      //odjavi trenutnog korisnika
      firebase.auth().signOut()
      .then(()=>{
        //zatim postavi state(ukloni podatke korisnika) i prebaci na login stranicu
        this.$store.dispatch('clearData');
        this.$router.push({name: 'Login'});
      }).catch(err=>{
        console.log(err);
      })
    }
  },
}
</script>

<style scoped>
</style>