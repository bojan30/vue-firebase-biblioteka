<template>
  <div class="form-wrapper">
    <form v-on:submit.prevent = "login" class="form">
      <div class="form-group">
        <h3>Login</h3>
      </div>
      <div class="form-group">
        <div class="input-wrapper email">
          <input type="email" placeholder="email..." v-model = "email" >
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper password">
          <input type="password" placeholder="password..." v-model = "password">
        </div>
      </div>
      <router-link class = "form-link" :to="{name: 'Register'}">Need account?</router-link>
      <div v-if = "feedback" class="feedback">
        {{feedback}}
      </div>
      <button class = "btn btn-login"  type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null  
    }
  },
  methods: {
    login(){
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
