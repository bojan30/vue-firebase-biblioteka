<template>
  <div class="container">
    <div class="add-book">
      <button class = "btn btn-add"><i class="fas fa-plus"></i>Add</button>
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
          
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {
    
  },
  data () {
    return {
    
    }
  },
  computed: {

  }
}
</script>

<style scoped>
</style>