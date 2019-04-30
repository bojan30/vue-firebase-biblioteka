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
      <table id="table">
        <thead>
          <tr>
            <th v-on:click = "sortBooks">
              Author
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: categories.author.active && !categories.author.ascending}"></i>
              <i  class  = "fas fa-caret-down category-icon down" :class = "{active: categories.author.active && categories.author.ascending}"></i>
            </th>
            <th v-on:click = "sortBooks">
              Title
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: categories.title.active && !categories.title.ascending}"></i>
              <i class  = "fas fa-caret-down category-icon down" :class = "{active: categories.title.active && categories.title.ascending}"></i>
            </th>
            <th v-on:click = "sortBooks">
              Publisher
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: categories.publisher.active && !categories.publisher.ascending}"></i>
              <i class  = "fas fa-caret-down category-icon down" :class = "{active: categories.publisher.active && categories.publisher.ascending}"></i>
            </th>
            <th v-on:click = "sortBooks">
              Year
              <i class  = "fas fa-caret-up category-icon up" :class = "{active: categories.year.active && !categories.year.ascending}"></i>
              <i class  = "fas fa-caret-down category-icon down" :class = "{active: categories.year.active && categories.year.ascending}"></i>
            </th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody id="books-holder">
          <Book v-for = "(book,index) in paginatedBooks" v-bind:key = "index" :currentBook = "book" v-on:openDeleteModal = "openDeleteBookModal($event)" v-on:openEditModal = "openEditBookModal($event)" />
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
      //kategorije sortiranja
      categories: {
        author: {
          ascending: true,
          active: true
        },
        title: {
          ascending: false,
          active: false
        },
        publisher: {
          ascending: false,
          active: false
        },
        year: {
          ascending: false,
          active: false
        }
      }
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
    //resetuje sva "active" svojstva na false
    resetActive(){
      Object.keys(this.categories).forEach(category=>{
        this.categories[category].active = false;
      })
    },
    sortBooks(){
      //kategorija za sortiranje
      const category = event.target.innerText.toLowerCase();
      //prvo resetuj sva active svojstva
      this.resetActive();
      //okreni smer sortiranja
      //aktiviraj samo kategoriju na ciji th je kliknuto
      this.categories[category].active = true;
      this.categories[category].ascending = !this.categories[category].ascending;
      this.getBooks.sort((book1,book2)=>{
        //pretvaranje svega u lowercase
        let one = book1[category].toLowerCase();
        let two  = book2[category].toLowerCase();
        //sort
        if(this.categories[category].ascending){
          if(one > two){
            return 1;
          }
          else if(one < two){
            return -1;
          }
          else{
            return 0;
          }
        }
        else{
          if(one > two){
            return -1;
          }
          else if(one < two){
            return 1;
          }
          else{
            return 0;
          }  
        }
      })
    }
  },
  updated(){
    this.updatePageNumber();
  }
}
</script>

<style scoped>
</style>