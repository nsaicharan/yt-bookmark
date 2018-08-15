import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAbP_kr8hSzXtJ4ppZyfI3cTTXJkO097wE",
  authDomain: "yt-bookmark.firebaseapp.com",
  databaseURL: "https://yt-bookmark.firebaseio.com",
  projectId: "yt-bookmark",
  storageBucket: "yt-bookmark.appspot.com",
  messagingSenderId: "132162830340"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
