<template>
  <div class="message">
    <p><span><i class = "fas fa-check"></i></span>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['message'],
}
</script>
