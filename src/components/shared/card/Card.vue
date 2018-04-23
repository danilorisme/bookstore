<template>

    <div class="card">
        <div class="row">
            <div class="col-md-2">
                <img class="img-fluid img-thumbnail" :src="cover" :alt="title" height="300px" width="200px">
            </div>
            <div class="col-md-8 card-body">
                <h4 class="card-title">{{ title }}</h4>
                <p class="card-text">{{ description }}</p>
                <p class="card-text">
                <strong>Author:</strong> {{ author }}<br />
                <strong>Publisher:</strong> {{ publisher }} <br />
                <strong>Pages:</strong> {{ pages }} <br />
                <strong>ISBN:</strong> {{ isbn }}</p>     
            </div>
        </div>
        <div class="row">
            <div class="card-body text-right mr-3">
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<script>
export default {

   props: ['title', 'description', 'author', 'publisher', 'isbn', 'pages', 'cover']
}
</script>

<style>

</style>