<template>
  <div class="container">
    <div class="add-book">
      <button v-on:click = "openAddBookModal" class = "btn btn-add"><i class="fas fa-plus"></i>Add</button>
    </div>
    <div class="input-wrapper">
      <input v-model="search" type="text" placeholder="Search...">
      <i class = "fas fa-search"></i>
    </div>
    <div class="books-wrapper">
      <h3>List of books</h3>
      <!--pagination-->
      <div class="pagination">
        <span class = "per-page">Per page: </span>
        <select class = "customSelect" v-model = "perPage">
          <option v-for = "(perPageOption,index) in perPageOptions" :key = "index">{{perPageOption}}</option>
        </select>
        <p class = "results" v-if = "paginatedBooks.length">Displaying {{ start + 1 }}-{{ start + paginatedBooks.length }} of {{ filteredBooks.length }}</p>
        <p class = "results" v-else>No results</p>
        <button :disabled = "pageNumber <= 0" class = "btn-paginate" v-on:click = "previousPage"><i class = "fas fa-angle-left"></i></button>
        <button :disabled = "pageNumber >= pageCount-1" class = "btn-paginate" v-on:click = "nextPage"><i class = "fas fa-angle-right"></i></button>
      </div>
      <div class="table-wrapper">
        <table id="table">
        <thead>
          <tr>
            <th v-on:click = "sortBooks('author')">
              Author
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: currentSort === 'author' && !ascending}"></i>
              <i  class  = "fas fa-caret-down category-icon down" :class = "{active: currentSort === 'author' && ascending}"></i>
            </th>
            <th v-on:click = "sortBooks('title')">
              Title
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: currentSort === 'title' && !ascending}"></i>
              <i class  = "fas fa-caret-down category-icon down" :class = "{active: currentSort === 'title' && ascending}"></i>
            </th>
            <th v-on:click = "sortBooks('publisher')">
              Publisher
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: currentSort === 'publisher' && !ascending}"></i>
              <i class  = "fas fa-caret-down category-icon down" :class = "{active: currentSort === 'publisher' && ascending}"></i>
            </th>
            <th v-on:click = "sortBooks('year')">
              Year
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: currentSort === 'year' && !ascending}"></i>
              <i class  = "fas fa-caret-down category-icon down" :class = "{active: currentSort === 'year' && ascending}"></i>
            </th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody id="books-holder">
          <Book v-for = "(book,index) in paginatedBooks" v-bind:key = "index" :currentBook = "book" v-on:openDeleteModal = "openDeleteBookModal($event)" v-on:openEditModal = "openEditBookModal($event)" />
        </tbody>
      </table>
      </div>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <addBookModal v-on:resetSort = "resetSort" style="animation-duration: 0.3s" v-if = "addBookModal"/>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <deleteBookModal style="animation-duration: 0.3s" :bookToDelete = "bookToDelete" v-if = "deleteBookModal"/>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <editBookModal v-on:resetSort = "resetSort" style="animation-duration: 0.3s" :bookToEdit = "bookToEdit" v-if = "editBookModal"/>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <Message v-if = "getMessage" :message = "getMessage" style="animation-duration: 0.3s"/>
    </transition>
    </div>
  </div>
</template>

<script>
import Book from './Book'
import addBookModal from './addBookModal'
import deleteBookModal from './deleteBookModal'
import editBookModal from './editBookModal'
import Message from './Message'
import {mapGetters} from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    Book,
    addBookModal,
    deleteBookModal,
    editBookModal,
    Message
  },
  data () {
    return {
      bookToDelete: null,
      bookToEdit: null,
      search: '',
      pageNumber: 0,
      perPageOptions: [
        5,10,50,100
      ],
      perPage: 10,
      //trenutna kategorija sortiranja i smer sortiranja
      currentSort: null,
      ascending: true
    }
  },
  computed: {
    ...mapGetters(['getBooks','getMessage','deleteBookModal','editBookModal','addBookModal','getMessage']),
    filteredBooks(){
      let lowercaseSearch = this.search.toLowerCase();
      return this.getBooks.filter(book => {
        return book.author.toLowerCase().match(lowercaseSearch)
              || book.title.toLowerCase().match(lowercaseSearch)
              || book.publisher.toLowerCase().match(lowercaseSearch)
              || book.year.toLowerCase().match(lowercaseSearch)
      })
    },
    pageCount(){
      let total = this.filteredBooks.length;
      let perPage = Number(this.perPage);
      return Math.ceil(total/perPage);
    },
    start(){
      return this.pageNumber * Number(this.perPage);
    },
    end(){
      return this.start + Number(this.perPage);
    },
    paginatedBooks(){
      return this.filteredBooks.slice(this.start,this.end);
    }
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
    previousPage(){
       if(this.pageNumber <= 0){
         this.pageNumber = 0;
       }
       else{
         this.pageNumber--;
       }
    },
    nextPage(){
      if(this.pageNumber >= this.pageCount - 1){
        this.pageNumber = this.pageCount - 1;
      }
      else{
        this.pageNumber++;
      }
    },
    updatePageNumber(){
      if(this.paginatedBooks.length === 0 && this.pageNumber > 0){
        this.pageNumber--;
      }
    },
    sortBooks(category){
      //prvo vrati na prvu stranu
      this.pageNumber = 0;
      //kategorija za sortiranje
      if(category === this.currentSort){
        this.ascending = !this.ascending;
      }
      this.currentSort = category;
      this.getBooks.sort((book1,book2)=>{
        //pretvaranje svega u lowercase
        let one = book1[category].toLowerCase();
        let two  = book2[category].toLowerCase();
        //sort
        if(this.ascending){
          if(one > two) return 1;
          else if(one < two) return -1;
          else return 0;
        }
        else{
          if(one > two) return -1;
          else if(one < two) return 1;
          else return 0;  
        }
      })
    },
    resetSort(){
      this.currentSort = 'author';
      this.ascending = false;
      this.sortBooks(this.currentSort);
    },
  },
  updated(){
    this.updatePageNumber();
  }
}
</script>

<style scoped>
</style>