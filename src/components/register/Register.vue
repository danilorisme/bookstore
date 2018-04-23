<template>
  <div>

    <div class="container">
      <div class="jumbotron">
        <h2 v-if="book.id">UPDATE {{ book.title }}</h2>
        <h2 v-else>ADD NEW BOOK </h2>
      </div>
    
      <div class="row">
        <div class="col-sm-12">
          <form @submit.prevent="save()">
            <div class="form-group">
              <label for="title">Title</label>
              <input v-model="book.title" type="text" class="form-control" id="title" placeholder="Title of book" required>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="book.description" class="form-control" id="description" rows="3" placeholder="Description of book" required></textarea>
            </div>
            <div class="form-group">
              <label for="author">Author</label>
              <input v-model="book.author" type="text" class="form-control" id="author" placeholder="Author of book" required>
            </div>
            <div class="form-group">
              <label for="publisher">Publisher</label>
              <input v-model="book.publisher" type="text" class="form-control" id="publisher" placeholder="Publisher of book" required>
            </div>
            <div class="form-group">
              <label for="pages">Pages</label>
              <input v-model="book.pages" type="text" class="form-control" id="pages" placeholder="Pages of book" required>
            </div>
            <div class="form-group">
              <label for="isbn">ISBN</label>
              <input v-model="book.isbn" type="text" class="form-control" id="isbn" placeholder="ISBN of book" required>
            </div>
            <div class="form-group">
              <label for="cover">Cover</label>
              <input v-model="book.cover" type="text" class="form-control" id="cover" placeholder="URL of cover image" required>
            </div>
            <div class="text-right">
              <router-link :to="{name: 'home'}"><form-button label="Back" type="button"/></router-link>
              <form-button label="Save" classStyle="success" type="submit"/>
            </div>
          </form>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Button from '../shared/button/Button.vue';
import Book from '../../domain/book/Book.js';
import BookService from '../../domain/book/BookService.js';

export default {

  components: {

    'form-button': Button
  },
  data() {

    return {

      book: new Book(),
      id: this.$route.params.id
    }
  },
  methods: {

    save() {
      this.service
        .register(this.book)
        .then(() => {
          if(this.id) this.$router.push({ name: 'home'});
          this.book = new Book()
        }, 
        err => console.log(err));
    }
  },
  created() {

    this.service = new BookService(this.$resource);

    if(this.id) {
      this.service
        .search(this.id)
        .then(book => this.book = book);
    }
  }
}
</script>

</style>