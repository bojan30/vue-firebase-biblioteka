<template>
    <tr>
    <td>{{currentBook.author}}</td>
    <td>{{currentBook.title}}</td>
    <td>{{currentBook.publisher}}</td>
    <td>{{currentBook.year}}</td>
    <td><button v-on:click = "openEditBookModal" class="edit">
      <i class="fa fa-pencil-alt"></i>
      <div class="tooltip">
        <span>Edit</span>
      </div>
    </button>
    <button v-on:click = "openDeleteBookModal" class="delete">
      <i class="fa fa-trash"></i>
      <div class="tooltip">
        <span>Delete</span>
      </div>
    </button></td>
  </tr>
</template>

<script>
import db from '../firebase/init'
export default {
  name: 'Book',
  props: [
    'currentBook'
  ],
  methods: {
    openDeleteBookModal(){
      this.$emit('openDeleteModal',this.currentBook);
    },
    openEditBookModal(){
      this.$emit('openEditModal',this.currentBook);
    }  
  }
}
</script>

<style>
</style>
