<template>
  <div class="form-wrapper">
    <form v-on:submit.prevent = "login" class="form">
      <div class="icon">
        <i class = "fas fa-user"></i>
      </div>
      <div class="form-group">
        <h3>Login</h3>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="email" placeholder="email..." v-model = "email" >
          <i class = "fas fa-envelope"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input ref="passwordInput" type="password" placeholder="password..." v-model = "password">
          <i class = "fas fa-key"></i>
          <div v-on:click = "togglePassword" class = "eye-icon">
            <i v-if = "passwordVisible" class = "fas fa-eye"></i>
            <i v-if = "!passwordVisible" class = "fas fa-eye-slash"></i>
          </div>
        </div>
      </div>
      <router-link class = "form-link" :to="{name: 'Signup'}">Need account?</router-link>
      <div v-if = "feedback" class="feedback">
        {{feedback}}
      </div>
      <button class = "btn btn-login"  type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase/init'
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null,
      passwordVisible: false
    }
  },
  methods: {
    login(){
      //proveri da li je uneta lozinka i email
      if(this.email && this.password){
      //pristupi firebase auth servisu
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred => {
        //postavi ulogovanog korisnika
        this.$store.commit('setCurrentUser', cred.user)
        //povuci podatke od trenutno ulogovanog korisnika
        this.$store.dispatch('fetchUserProfile')
        //prebaci na admin(dashboard) stranicu
        this.$router.push('/dashboard')
    }).catch(err => {
        this.feedback = err.message;
    })
    }
    else{
      this.feedback = 'You must enter all fields...'
    }
    },
    togglePassword(){
      let input = this.$refs.passwordInput;
      if(input.type === 'password'){
        input.type = 'text';
        this.passwordVisible = true;
      }
      else{
        input.type = 'password';
        this.passwordVisible = false;
      }
    }
  }
}
</script>

<style scoped>
</style>
