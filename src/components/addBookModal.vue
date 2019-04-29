<template>
  
    <div class="modal">
    <form v-on:submit.prevent = "addBook" class="form">
      <i v-on:click = "close" class = "fas fa-times"></i>
      <div class="form-group">
        <h3>Add book</h3>
      </div>
      <div class="form-group">
        <!-- <label for="author">Author</label> -->
        <div class="input-wrapper">
          <input type="text" placeholder="author..." v-model = "author">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div class="form-group">
        <!-- <label for="title">Title</label> -->
        <div class="input-wrapper">
          <input type="text" placeholder="title..." v-model = "title">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div class="form-group">
        <!-- <label for="publisher">Publisher</label> -->
        <div class="input-wrapper">
          <input type="text" placeholder="publisher..." v-model = "publisher">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div class="form-group">
        <!-- <label for="year">Year</label> -->
        <div class="input-wrapper">
          <input type="text" placeholder="year..." v-model = "year">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div v-if = "feedback" class="feedback">
        {{feedback}}
      </div>
      <button :disabled = "pending" class="btn btn-login" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
/*
  else{
            //ako je sve u redu onda izvrsi ubacivanje knjige
            this.pending = true;
        db.collection('books').add({
          author: this.author,
          title: this.title,
          publisher: this.publisher,
          year: this.year,
          user_id: this.getUserProfile.user_id,
        })
        .then(()=>{
          //resetuj input polja
          this.author = null;
          this.title = null;
          this.publisher = null;
          this.year = null;
          this.pending = false;
          this.feedback = null;

          //ovde treba dodati poruku
          this.$store.commit('setMessage','Book successfuly added!');
          //brisanje poruke nakon dve sekunde
          this.$store.dispatch('setMessage',null);
        })
          }
        })
*/
import firebase from 'firebase'
import db from '../firebase/init'
import {mapGetters} from 'vuex'
export default {
  name: 'addBookModal',
  data () {
    return {
      author: null,
      title: null,
      publisher: null,
      year: null,
      feedback: null,
      pending: false
    }
  },
  computed: {
    ...mapGetters(['getUserProfile'])
  },
  methods: {
    close(){
      this.$store.commit('setAddBookModal',false);
    },
    resetInputs(){
      this.author = null;
      this.title = null;
      this.publisher = null;
      this.year = null;
      this.pending = false;
      this.feedback = null;
    },
    addBook(){
      //prvo proveri da li su sva polja uneta
      if(this.author && this.title && this.publisher && this.year){
        //proveri da li knjiga sa istim nazivom vec postoji
        db.collection('books').where('user_id','==',this.getUserProfile.user_id).where('title','==',this.title).where('author','==',this.author).get()
        .then(snapshot=>{
          if(snapshot.docs.length){
            //ako knjiga vec postoji, izbaci poruku
            this.feedback = 'Book with that title and author allredy exists!';
          }
          else{
             //ako je sve u redu onda izvrsi ubacivanje knjige
            this.pending = true;
            db.collection('books').add({
              author: this.author,
              title: this.title,
              publisher: this.publisher,
              year: this.year,
              user_id: this.getUserProfile.user_id,
            })
            .then(()=>{
              //resetuj input polja
              this.resetInputs();
              //ovde treba dodati poruku
              this.$store.commit('setMessage','Book successfuly added!');
              //brisanje poruke nakon dve sekunde
              this.$store.dispatch('setMessage',null);
            })
          }
        })
      }
      else{
        this.feedback = 'You must enter all fields';
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>