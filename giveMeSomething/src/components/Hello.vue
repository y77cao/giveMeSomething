<template>
  <div class='mainPage'>
    <div class="give">
       Give me something <input v-model="message1">.
   </div>
   <div class="giveHints" v-for="hint in hints">
     <div v-on:click="copyHint(hint)">{{hint}}</div>
   </div>

   <div class="iFeel">
       I feel <input v-model="message2"> today.
   </div>
   <div class='hints' v-for="hint in hints">
     <div v-on:click="copyHint(hint)">{{hint}}</div>
   </div>

   <button>Find movies</button>

</div>

</template>

<script>
export default {
  name: 'mainPage',
  data () {
    return {
      message1: '',
      message2: '',
      hints: [
      'happy',
      'sad',
      'exited',
      'in love'
      ]
    }
  },

  methods: {
    copyHint(hint) {
      this.message1 = hint;
      this.message2 = hint;
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
