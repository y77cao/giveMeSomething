<template>
 <div class="container">
  <div class="nav">
    <div class="header">GiveMeSomething</div>
    <div class="about">About</div>
  </div>

  <div class='main-page'
      v-if="!results.length && !fetched">
    <div class="tab">
    <button class="iwant"
            v-on:click="iwant=true;ifeel=false;message=''">I WANT</button>
    <button class="ifeel"
            v-on:click="iwant=false; ifeel=true;message=''">I FEEL</button>
  </div>

    <div class="iWant" v-show="iwant">
      <div> Give me something <input v-model="message">.</div>
      
      <div class="giveHints" v-for="hint in hints1">
        <div v-on:click="copyHint(hint)">{{hint}}</div>
      </div>
   </div>

   <div class="iFeel" v-show="ifeel">
     <div> I feel <input v-model="message"> today.</div>
   
     <div class='hints' v-for="hint in hints2">
       <div v-on:click="copyHint(hint)">{{hint}}</div>
     </div>
   </div>

   <button v-on:click="getMovies()">Find movies</button>
</div>

<div class="result-page"
     v-else>
  <div v-on:click="fetched=false;results=[]">Search Again</div>
  <div v-if="results.length > 0 && fetched">
    <div class="movie-list"
         v-for="res in results">
       <img v-bind:src="getImgSrc(res.poster_path)"/>
       {{res.title}}
       {{res.vote_average}}
   </div>

   <button class="pre"
           v-on:click="getPrePage()">pre</button>
   <button class="next"
           v-on:click="getNextPage()">next</button>
  </div>

   <div v-else-if="!results.length && fetched">
     <div class="not-found">Don't know what exactly you want...but still here are some choices you might like.</div>
   </div>
 </div>
</div> 

</template>

<script>
import {getMovies, getBaseUrl} from '../apis/tmdbApi';

export default {
  name: 'mainPage',
  data () {
    return {
      message: '',
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
      'excited',
      'in love'
      ],
      results: [],
      fetched: false,
      page: 1,
    }
  },

  methods: {
    copyHint(hint) {
       this.message = hint;
    },

    getMovies(){ 
      getMovies(this.message, this.page)
      .then(json => {
        this.results = json.results;
        this.fetched = true;
      })
    },

    getImgSrc(path) {
      return 'https://image.tmdb.org/t/p/w185/' + path;
    },

    getNextPage() {
      ++this.page;
      if (this.page > 1001 || this.page < 1) {
        this.page = 1;
      }
        getMovies(this.message, this.page)
        .then(json => {
        this.results = json.results;
        this.fetched = true;
      })
    },

    getPrePage() {
      --this.page;
      if (this.page > 1001 || this.page < 1) {
        this.page = 1;
      }
        getMovies(this.message, this.page)
        .then(json => {
        this.results = json.results;
        this.fetched = true;
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    color: #fff;
  }

  button {
    color: #2c3e50;
    background:none;
    border:none;
  }

  .container {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat center center;
        background-size: cover;
  }

  .nav {
    position: absolute;
    left: 0;
    top: 0;
    margin: auto;
    width: 100%;
    height: 5%;
    background-color: #ce1e1e;
  }

  .nav .header {
    position: absolute;
    top: 15%;
    left: 5%;
    margin: auto;

  }

  .nav .about {
    position: absolute;
    top: 15%;
    right: 5%;
    margin: auto;
  }

  .main-page, .result-page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 30%;
  }

  .iwant {
    background: #fff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .iwant:active, .ifeel:active {
    background: #fff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
</style>
