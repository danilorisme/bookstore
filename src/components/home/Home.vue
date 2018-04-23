<template>
  <div>
    <main role="main" class="container">
      <div class="jumbotron">
        <h1>BOOK STORE</h1>
        <p class="lead">Your online book store! =)</p>
      </div>

      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-10"><input type="search" class="form-control form-control-lg" v-on:input="filter = $event.target.value" placeholder="Filter by book title." /></div>
            <div class="col-sm-2 mt-2"><router-link to="/register">Add New Book</router-link></div>
          </div>

          <div v-show="message" class="container">
            <div class="alert alert-primary my-3" role="alert">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
        
        <div class="container py-3" v-for="book of booksFilter" :key="book.id">
          <card-book :title="book.title" :description="book.description" :author="book.author" :publisher="book.publisher" :isbn="book.isbn" :pages="book.pages" :cover="book.cover">
            <router-link :to="{ name: 'update', params: { id: book.id }}">
              <card-button label="Update" type="button"/>
            </router-link>
            <card-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(book)" />
          </card-book>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Card from '../shared/card/Card.vue';
import Button from '../shared/button/Button.vue';
import BookService from '../../domain/book/BookService';

export default {

  components: {

    'card-book': Card,
    'card-button': Button
  },
  data () {

    return {

      books: [],
      filter: '',
      message: ''
    }
  },
  methods: {

    remove(book) {
      this.service
        .delete(book.id)
        .then(() => {
            let index = this.books.indexOf(book);
            this.books.splice(index, 1);
            this.message = 'Book successfully removed! =)'
          }, 
          err => this.message = err.message
        )
    }
  },
  computed: {

    booksFilter() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.books.filter(book => exp.test(book.title));
      } else {
        return this.books;
      }
    }
  },
  created() {

    this.service = new BookService(this.$resource);

    this.service
      .list()
      .then(books => this.books = books, err => this.mensagem = err.message);
  }
}
</script>

<style>

</style>
