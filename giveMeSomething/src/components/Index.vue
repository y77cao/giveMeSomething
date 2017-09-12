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
            ref="tab1"
            v-on:click="iwant=true;ifeel=false;message=''">I WANT</button>
    <button class="ifeel"
            ref="tab2"
            v-on:click="iwant=false; ifeel=true;message=''">I FEEL</button>
  </div>

    <div class="iWant" v-show="iwant">
      <div class="syntax"> Give me something <input v-model="message">.</div>
      
      <div class="hints" v-for="hint in hints1">
        <div v-on:click="copyHint(hint)">{{hint}}</div>
      </div>
   </div>

   <div class="iFeel" v-show="ifeel">
     <div class="syntax"> I feel <input v-model="message"> today.</div>
   
     <div class='hints' v-for="hint in hints2">
       <div v-on:click="copyHint(hint)">{{hint}}</div>
     </div>
   </div>

   <button v-on:click="getMovies()" class="find-movies">Find movies!</button>
</div>

<div class="result-page"
     v-else>
  <div v-on:click="fetched=false;results=[]">Search Again</div>
  <div class="success-result"
       v-if="results.length > 0 && fetched">
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

   <div class="not-found-result"
        v-else-if="!results.length && fetched">
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
      'depressing',
      'scary',
      'healing',
      'unreal'
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
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    color: #fff;
    font-family: 'Ubuntu Mono', cursive;
  }

  button {
    color: #2c3e50;
    background:none;
    border:none;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 1px solid #fff;
    width: 25%;
    font-family: 'Rock Salt';
    font-size: 2rem;
  }

  @font-face {
  font-family: 'Rock Salt';
  font-style: normal;
  font-weight: 400;
  src: local('Rock Salt Regular'), local('RockSalt-Regular'), url(https://fonts.gstatic.com/s/rocksalt/v7/Q94aHXFHGip10K5uxi1jOJBw1xU1rKptJj_0jans920.woff2) format('woff2');
  }

  @font-face {
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Ubuntu Mono'), local('UbuntuMono-Regular'), url(https://fonts.gstatic.com/s/ubuntumono/v6/ViZhet7Ak-LRXZMXzuAfkYgp9Q8gbYrhqGlRav_IXfk.woff2) format('woff2');
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
    margin-top: 0;
    top: 20%;
    width: 80%;
    height: 30%;
  }

  .tab {
    width: 100%;
    height: 15%;
    margin-bottom: 5%;
  }

  .tab * {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 25%;
    height: 100%;
    font-size: 1.2rem;
  }

  .iwant {
    background-color: #fff;
    opacity: 0.9;
  }

  .find-movies {
    background-color: #ce1e1e;
    color: #fff;
    width: 50%;
    height: 25%;
    border-radius: 10px;
    margin: 5%;
    font-size: 1.2rem;
  }

  .syntax {
    font-size: 3rem;
  }

  .hints {
    display: inline-block;
    margin: 1%;
    border: 1px solid #fff;
    border-radius: 10px;
    width: 20%;
    padding: 1%;
    font-size: 1.2rem;
  }

  .hints:hover {
    background-color: #ce1e1e;
  }

  .result-page {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10%;
    left: 0;
  }

  .success-result {
    width: 100%;
    height: 80%;
    position: absolute;
    overflow: scroll;
  }

  .movie-list {
    display: inline-block;
    width: 15%;
    height: 45%;
    margin: 1%;
  }

  .movie-list * {
    display: table;
    text-align: center;
  }
</style>
