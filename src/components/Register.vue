<template>
  <div class="form-wrapper">
    <form v-on:submit.prevent = "register" class="form">
      <div class="form-group">
        <h3>Register</h3>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="text" placeholder = "username..." v-model = "username">
          <i class = "fas fa-user"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="email" placeholder = "email..." v-model = "email">
          <i class = "fas fa-envelope"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="password" placeholder="password..." v-model = "password">
          <i class = "fas fa-key"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="password" placeholder="repeat password..." v-model = "repeatPassword">
          <i class = "fas fa-key"></i>
        </div>
      </div>
      <router-link class = "form-link" :to="{name: 'Login'}">Have account already?</router-link>
      <div v-if = "feedback" class="feedback">
        {{feedback}}
      </div>
      <button class="btn btn-register" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase/init'
export default {
  name: 'Register',
  data () {
    return {
      username: null,
      email: null,
      password: null,
      repeatPassword: null,
      feedback: null
    }
  },
  methods: {
    register(){
      if(this.username && this.email && this.password && this.repeatPassword){
        //ako su sva polja uneta, prvo proveri da li korisnik sa sa username-om vec postoji u bazi
        db.collection('users').doc(this.username).get()
        .then(doc=>{
          if(doc.exists){
            this.feedback = 'Username with the same name allready exists!'
          }
          else{
            //proveri da li se sifra i ponovljena sifra slazu
            if(this.password !== this.repeatPassword){
              this.feedback = 'Passwords don\'t match!'
            }
            else{
              //napravi nov nalog
              firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(cred=>{
                this.$store.commit('setCurrentUser',cred.user)
                //napravi novog korisnika u kolekciji
                db.collection('users').doc(this.username).set({
                  username: this.username,
                  user_id: cred.user.uid
                }).then(()=>{
                  //fetchuj podatke korisnika i prebaci na admin(dashboard) stranicu
                  this.$store.dispatch('fetchUserProfile')
                  this.$router.push({name: 'Dashboard'})
                }).catch(err=>{
                  this.feedback = err.message;
                });
              })
              .catch(err=>{
                this.feedback = err.message;
              });
            }
          }
        })
      }
      else{
        this.feedback = 'You must enter all fields...'
      }
    }
  }
}
</script>

<style scoped>
</style>
