<template>
  <div class="form-wrapper">
    <form v-on:submit.prevent = "register" class="form">
      <div class="form-group">
        <h3>Register</h3>
      </div>
      <div class="form-group">
        <div class="input-wrapper username">
          <input type="text" placeholder = "username..." v-model = "username">
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper email">
          <input type="email" placeholder = "email..." v-model = "email">
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper password">
          <input type="password" placeholder="password..." v-model = "password">
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper password">
          <input type="password" placeholder="repeat password..." v-model = "repeatPassword">
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
