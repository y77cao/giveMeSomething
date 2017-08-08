<template>
  <div class="hello">
    <div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
   </div>
</div>

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
