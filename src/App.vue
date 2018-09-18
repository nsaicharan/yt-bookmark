<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          YTBookmark
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped" v-if="!isAuthenticated">
              <p class="control">
                <router-link class="button is-primary" to="/signup">Sign Up</router-link>
              </p>
              <p class="control">
                <router-link class="button is-info" to="/login">Login</router-link>
              </p>
            </div>

            <div class="field is-grouped" v-else>
              <p class="control">
                <button class="button is-info" @click="showVideoForm = !showVideoForm">Add Video</button>
              </p>

              <p class="control">
                <button class="button is-primary" @click="showCategoryForm = !showCategoryForm">Add Category</button>
              </p>

              <p class="control">
                <button class="button is-danger" @click="logOut">Logout</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Catergory Form -->
    <div class="modal" :class="{'is-active': showCategoryForm}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="addCategory">
          <div class="field">
            <input type="text" class="input" v-model="catTitle">
          </div>

          <div class="field">
            <button class="button is-success">Add Category</button>
          </div>
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showCategoryForm = !showCategoryForm"></button>
    </div>

    <!-- Add Video Form -->
    <div class="modal" :class="{'is-active': showVideoForm}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="addVideo">
          <div class="field">
            <input type="text" class="input" placeholder="Enter Title" v-model="videoTitle">
          </div>

          <div class="field">
            <input type="text" class="input" placeholder="Enter URL" v-model="videoURL">
          </div>

          <div class="field select">
            <select v-model="videoCategory">
              <option value="" selected disabled>Select Category</option>
              <option v-for="category in categories" :key="category.title" :value="category.title">{{category.title}}</option>
            </select>
          </div>

          <div class="field">
            <button class="button is-success">Add Video</button>
          </div>
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showVideoForm = !showVideoForm"></button>
    </div>

    <router-view/>
  </div>
</template>


<script>
import firebase from "firebase";
import { db } from "./main";

export default {
  data() {
    return {
      isAuthenticated: false,
      categories: [],
      showCategoryForm: false,
      catTitle: "",
      showVideoForm: false,
      videoTitle: "",
      videoCategory: "",
      videoURL: ""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.$router.push("/dashboard");
      }
    });
  },
  firestore() {
    return {
      categories: db.collection("categories")
    };
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      this.isAuthenticated = false;
      this.$router.push("/login");
    },
    addCategory() {
      db.collection("categories").add({ title: this.catTitle });
      this.showCategoryForm = !this.showCategoryForm;
      this.catTitle = "";
    },
    addVideo() {
      if (this.videoTitle && this.videoCategory && this.videoURL) {
        const video = {
          title: this.videoTitle,
          url: this.videoURL
        };

        db
          .collection("categories")
          .doc(this.videoCategory)
          .collection("videos")
          .add(video);

        this.showVideoForm = !this.showVideoForm;
        this.videoTitle = "";
        this.videoCategory = "";
        this.videoURL = "";
      } else {
        alert("Please fill out all fields.");
      }
    }
  }
};
</script>


<style>
@import "../node_modules/bulma/css/bulma.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
