<template>
  <div class="modal modal-delete">
      <form v-on:submit.prevent = "deleteBook" class="form">
        <div class="form-group">
          <h3>Delete book?</h3>
        </div>
        <div class="delete-modal-buttons">
          <button type = "button" v-on:click = "close" class="btn cancel">Cancel</button>
          <button type = "submit" class="btn confirm">Confirm</button>
        </div>
      </form>
    </div>
</template>

<script>
import db from '../firebase/init'
import {mapGetters} from 'vuex'
export default {
  name: 'deleteBookModal',
  props: [
    'bookToDelete'
  ],
  data(){
    return{
    }
  },
  methods: {
    close(){
      this.$store.commit('setDeleteBookModal',false);
    },
    deleteBook(){
      this.close();
      db.collection('books').doc(this.bookToDelete.id).delete()
      .then(()=>{
        //ovde treba dodati poruku
      })
    }
  }
}
</script>

<style>

</style>
