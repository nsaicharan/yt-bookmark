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
                <button class="button is-danger" @click="logOut">Logout</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      this.isAuthenticated = false;
      this.$router.push("/login");
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
