<template>
  <div class="columns">
    <div class="column is-4 is-offset-4">
      <h1 class="title">Sign Up Page</h1>

      <form @submit.prevent="signUp">
        <div class="field">
          <div class="control">
            <input type="email" class="input" placeholder="Email" v-model="email">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input type="password" class="input" placeholder="Password" v-model="password">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success">Submit</button>
          </div>
        </div>

        <article class="message is-danger" v-if="error">
          <div class="message-body">
           {{ error }}
          </div>
        </article>
      </form>
    </div>
    <!-- End Column -->
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      isAuthenticated: false,
      error: ""
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
    signUp() {
      console.log("Signup");

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(error => (this.error = error.message));
    }
  }
};
</script>
