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
      <!--prikaz tabele-->
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
          <!--prikaz svih knjiga-->
          <Book 
            v-for = "(book,index) in paginatedBooks" 
            v-bind:key = "index" 
            :currentBook = "book" 
            v-on:openDeleteModal = "openDeleteBookModal($event)" 
            v-on:openEditModal = "openEditBookModal($event)" 
          />
        </tbody>
      </table>
      </div>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <!--dodavanje novih knjiga-->
        <addBookModal 
          v-on:resetSort = "resetSort" 
          v-if = "addBookModal"
          style="animation-duration: 0.3s" 
        />
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <!--brisanje knjiga-->
        <deleteBookModal 
          style="animation-duration: 0.3s" 
          :bookToDelete = "bookToDelete" 
          v-if = "deleteBookModal"
        />
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <!--editovanje knjiga-->
        <editBookModal 
          v-on:resetSort = "resetSort"
          style="animation-duration: 0.3s" 
          :bookToEdit = "bookToEdit" 
          v-if = "editBookModal"
        />
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <!--prikaz poruke usled promene u bazi-->
        <Message 
          v-if = "getMessage" 
          :message = "getMessage" 
          style="animation-duration: 0.3s"
        />
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
      //opcije za broj knjiga po strani
      perPageOptions: [
        5,10,50,100
      ],
      //default opcija(deset knjiga po strani)
      perPage: 10,
      //trenutna kategorija sortiranja i smer sortiranja
      currentSort: null,
      ascending: true
    }
  },
  computed: {
    ...mapGetters(['getBooks','getMessage','deleteBookModal','editBookModal','addBookModal','getMessage']),
    //vraca filtrirane knjige
    filteredBooks(){
      let lowercaseSearch = this.search.toLowerCase();
      return this.getBooks.filter(book => {
        return book.author.toLowerCase().match(lowercaseSearch)
              || book.title.toLowerCase().match(lowercaseSearch)
              || book.publisher.toLowerCase().match(lowercaseSearch)
              || book.year.toLowerCase().match(lowercaseSearch)
      })
    },
    //racuna koliko ima stranica
    pageCount(){
      let total = this.filteredBooks.length;
      let perPage = Number(this.perPage);
      return Math.ceil(total/perPage);
    },
    //broj prve knjige koju treba prikazati
    start(){
      return this.pageNumber * Number(this.perPage);
    },
    //broj poslednje knjige koju treba prikazati
    end(){
      return this.start + Number(this.perPage);
    },
    //niz knjiga koje treba trenutno prikazati
    paginatedBooks(){
      return this.filteredBooks.slice(this.start,this.end);
    }
  },
  methods: {
    //metode za kontrolisanje modala(state-u se salje informacija da treba otvoriti odredjeni modal)
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
    //metode za promenu trenutne strane
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
      //vrati na prvu stranu
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
    //ako se doda nova knjiga ili ako se edituje neka od knjiga, sortiranje se vraca na default
    resetSort(){
      if(this.currentSort){
        //obrni smer sortiranja zato sto ce se unutar funkcije jos jednom redosled okrenuti, da bi se sve vratilo kako je bilo
        this.ascending = !this.ascending;
        this.sortBooks(this.currentSort);
      }
    },
  },
  updated(){
    //nakon update-a stranice proveri da li treba promeniti broj stranice
    //u slucaju da je obrisana poslednja knjiga na stranici
    this.updatePageNumber();
  }
}
</script>