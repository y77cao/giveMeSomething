<template>

  <div class='mainPage'>
    <div class="tab">
    <button v-on:click="iwant=true;ifeel=false;message1=''">I WANT</button>
    <button  v-on:click="iwant=false; ifeel=true;message2=''">I FEEL</button>
  </div>

    <div class="iWant" v-show="iwant">
      <div> Give me something <input v-model="message1">.</div>
      
      <div class="giveHints" v-for="hint in hints1">
        <div v-on:click="copyHint(hint)">{{hint}}</div>
      </div>
   </div>

   <div class="iFeel" v-show="ifeel">
     <div> I feel <input v-model="message2"> today.</div>
   
     <div class='hints' v-for="hint in hints2">
       <div v-on:click="copyHint(hint)">{{hint}}</div>
     </div>
   </div>

   <button v-on:click="getMovies()">Find movies</button>

</div>

</template>

<script>
import {getMovies} from '../apis/tmdbApi';

export default {
  name: 'mainPage',
  data () {
    return {
      message1: '',
      message2: '',
      iwant: false,
      ifeel: true,
      hints1: [
      'interesting',
      'boring',
      'cool',
      'depressing'
      ],
      hints2: [
      'happy',
      'sad',
      'exited',
      'in love'
      ]
    }
  },

  methods: {
    copyHint(hint) {
      this.iwant? this.message1 = hint: this.message2 = hint;
    },
    getMovies(){ getMovies(); }
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
