export default class BookService {

    constructor(resource) {

        this._resource = resource('api/book{/id}');
    }

    register(book) {

        if(book.id) {
            return this._resource.update({ id: book.id }, book);

        } else {
            return this._resource.save(book);
        }
    }

    list() {

        return this._resource
          .query()
          .then(
              res => res.json(),
              err => {
                console.log(err);
                this.message = 'Oops! Sorry, but we could not get the book list. =/ Please try again later.'
              }
            );
    }

    delete(id) {

        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Oops! Sorry, but we could not remove the book. =/ ');
            });
    }

    search(id) {

        return this._resource
            .get({ id })
            .then(res => res.json());
    }
}