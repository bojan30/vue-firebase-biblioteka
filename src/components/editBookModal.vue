<template>
  <div class="modal">
    <form v-on:submit.prevent = "editBook" class="form">
      <i v-on:click = "close" class = "fas fa-times"></i>
      <div class="form-group">
        <h3>Edit book</h3>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="text" placeholder="author..." v-model = "author">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="text" placeholder="title..." v-model = "title">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="text" placeholder="publisher..." v-model = "publisher">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-wrapper">
          <input type="text" placeholder="year..." v-model = "year">
          <i class = "fas fa-pencil-alt"></i>
        </div>
      </div>
      <div v-if = "feedback" class="feedback">
        {{feedback}}
      </div>
      <button :disabled = "pending" class="btn btn-login" type="submit">Edit</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase/init'
import {mapGetters} from 'vuex'
export default {
  name: 'editBookModal',
  props: ['bookToEdit'],
  data(){
    return {
      author: this.bookToEdit.author,
      title: this.bookToEdit.title,
      publisher: this.bookToEdit.publisher,
      year: this.bookToEdit.year,
      feedback: null,
      pending: false
    }
  },
  methods: {
    close(){
      this.$store.commit('setEditBookModal',false);
    },
    editBook(){
      if(this.author && this.title && this.publisher && this.year){
        //editovanje
        this.pending = true;
        db.collection('books').doc(this.bookToEdit.id).update({
          author: this.author,
          title: this.title,
          publisher: this.publisher,
          year: this.year
        })
        .then(()=>{
          this.$emit('resetSort');
          this.close();
          //ovde treba dodati poruku
          this.$store.commit('setMessage','Book successfuly edited!');
          //brisanje poruke nakon dve sekunde
          this.$store.dispatch('setMessage',null);
        })
      }
      else{
        this.feedback = 'You must enter all fields'
      } 
    }
  }
}
</script>
