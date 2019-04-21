<template>
  <div class="container">
    <div class="add-book">
      <button v-on:click = "openAddBookModal" class = "btn btn-add"><i class="fas fa-plus"></i>Add</button>
    </div>
    <div class="input-wrapper search">
      <input type="text" placeholder="Search...">
    </div>
    <div class="books-wrapper">
      <h3>List of books</h3>
      
      <table id="table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Publisher</th>
            <th>Year</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody id="books-holder">
          <Book v-for = "(book,index) in getBooks" v-bind:key = "index" :currentBook = "book" v-on:openDeleteModal = "openDeleteBookModal($event)" v-on:openEditModal = "openEditBookModal($event)" />
        </tbody>
      </table>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <addBookModal style="animation-duration: 0.3s" v-if = "addBookModal"/>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <deleteBookModal style="animation-duration: 0.3s" :bookToDelete = "bookToDelete" v-if = "deleteBookModal"/>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <editBookModal style="animation-duration: 0.3s" :bookToEdit = "bookToEdit" v-if = "editBookModal"/>
    </transition>
    </div>
  </div>
</template>

<script>
import Book from './Book'
import addBookModal from './addBookModal'
import deleteBookModal from './deleteBookModal'
import editBookModal from './editBookModal'
import {mapGetters} from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    Book,
    addBookModal,
    deleteBookModal,
    editBookModal,
  },
  data () {
    return {
      bookToDelete: null,
      bookToEdit: null,
    }
  },
  computed: {
    ...mapGetters(['getBooks','getMessage','deleteBookModal','editBookModal','addBookModal']),
  },
  methods: {
    openAddBookModal(){
      this.$store.commit('setAddBookModal',true);
    },
    openDeleteBookModal(bookToDelete){
      this.$store.commit('setDeleteBookModal',true);
      this.bookToDelete = bookToDelete;
    },
    openEditBookModal(bookToEdit){
      this.$store.commit('setEditBookModal',true);
      this.bookToEdit = bookToEdit;
    },
  }
}
</script>

<style scoped>
</style>