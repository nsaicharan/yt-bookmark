<template>
  <div class="container is-fluid columns is-multiline">
    <div class="column is-12">
      <button class="button is-primary" @click="showCategoryForm = !showCategoryForm">Edit Category</button>
    </div>

    <!-- Catergory Form -->
    <div class="modal" :class="{'is-active': showCategoryForm}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="saveCategory">
          <div class="field">
            <input type="text" class="input" v-model="catTitle">
          </div>

            <div class="field">
              <button class="button is-success">Save</button>
            </div>
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showCategoryForm = !showCategoryForm"></button>
    </div>

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
    category: String,
    categoryID: String
  },
  data() {
    return {
      videos: [],
      showCategoryForm: false,
      catTitle: ""
    };
  },
  mounted() {
    if (this.$props.category === "Newest") {
      this.$props.categories.forEach(cat => {
        db.collection("categories")
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

    // Set catTitle
    this.catTitle = this.$props.category;
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
        db.collection("categories")
          .doc(video.category)
          .collection("videos")
          .doc(video.id)
          .delete();

        this.videos = this.videos.filter(item => item.id !== video.id);
      } else {
        db.collection("categories")
          .doc(this.$props.category)
          .collection("videos")
          .doc(video.id)
          .delete();
      }
    },
    saveCategory() {
      if (this.catTitle.trim() !== "") {
        console.log(this.$props.category);

        db.collection("categories")
          .doc(this.$props.categoryID)
          .set({ title: this.catTitle })
          .catch(err => console.log(err));

        this.showCategoryForm = false;

        this.$emit("updateCategory", this.catTitle);
      } else {
        alert("Please enter a name for the category.");
      }
    }
  }
};
</script>

