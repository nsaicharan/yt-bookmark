<template>
  <div class="container is-fluid columns is-multiline">
    <div class="column is-4" v-for="video in videos" :key="video.title">
      <div class="card">
        <div class="card-image">
          <iframe :src="makeEmbeddable(video.url)" width="100%" height="200"></iframe>
        </div>

        <div class="content">
          {{ video.title }}
        </div>

        <div class="card-footer">
          <a @click="deleteVideo(video)" class="card-footer-item button is-danger">Delete</a>
        </div>
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
                url: collection.data().url,
                id: collection.id,
                category: cat.title
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
    },
    deleteVideo(video) {
      if (this.$props.category === "Newest") {
        db
          .collection("categories")
          .doc(video.category)
          .collection("videos")
          .doc(video.id)
          .delete();

        this.videos = this.videos.filter(item => item.id !== video.id);
      } else {
        db
          .collection("categories")
          .doc(this.$props.category)
          .collection("videos")
          .doc(video.id)
          .delete();
      }
    }
  }
};
</script>

