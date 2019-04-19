<template>
  <div class="nav">
    <div class = "logo">
      <a href="index.html"><i class="fas fa-book"></i>Library</a>
    </div>
    <ul class="navbar">
      <li class = "nav-item"><router-link class = "nav-link" v-bind:to = "{name: 'Login'}">Login</router-link></li>
      <li class="nav-item"><router-link class = "nav-link" v-bind:to = "{name: 'Register'}">Register</router-link></li>
      <li class="nav-item username"><i class = "fas fa-user"></i>username</li>
      <li class="nav-item"><a href = "" class = "nav-link">Logout</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      
    }
  },
  computed: {
  },
  methods: {
    
  },
}
</script>

<style scoped>
</style>