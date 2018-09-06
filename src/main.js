import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import VueFire from "vuefire";
import "firebase/firestore";

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

Vue.use(VueFire);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export { db };

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
