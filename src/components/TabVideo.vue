<template>
  <div class="container is-fluid columns is-multiline">
    <div class="card column is-4" v-for="video in videos" :key="video.title">
      <div class="card-image">
        <iframe :src="makeEmbeddable(video.url)" width="100%" height="200"></iframe>
      </div>

      <div class="content">
        {{ video.title }}
      </div>
    </div>
    <!-- ./column -->
  </div>
  <!-- ./columns -->
</template>

<script>
import { db } from "../main";

export default {
  name: "TabVideo",
  props: {
    categories: Array,
    category: String
  },
  data() {
    return {
      videos: []
    };
  },
  mounted() {
    if (this.$props.category === "Newest") {
      this.$props.categories.forEach(cat => {
        db
          .collection("categories")
          .doc(cat.title)
          .collection("videos")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(collection => {
              this.videos.push({
                title: collection.data().title,
                url: collection.data().url
              });
            });
          });
      });
    }
  },
  firestore() {
    if (this.$props.category !== "Newest") {
      return {
        videos: db
          .collection("categories")
          .doc(this.$props.category)
          .collection("videos")
      };
    }
  },
  methods: {
    makeEmbeddable(url) {
      if (url.includes("&")) {
        const embeddableUrl = url.split("&")[0].split("=")[1];
        return "https://youtube.com/embed/" + embeddableUrl;
      } else {
        const embeddableUrl = url.split("=")[1];
        return "https://youtube.com/embed/" + embeddableUrl;
      }
    }
  }
};
</script>

