<template>
  <div>
    <h1 class="title">Dashboard</h1>

    <div class="tabs">
      <ul>
        <li :class="{'is-active': activeCategory === 'Newest'}">
          <a href="#" @click="setCategory('Newest')">Newest</a>
        </li>

        <li :class="{'is-active': activeCategory === category.title}" v-for="category in categories" :key="category.title">
          <a href="#" @click="setCategory(category.title)">{{category.title}}</a>
        </li>
      </ul>
    </div>

    <TabVideo :categories="categories" category="Newest" v-if="activeCategory === 'Newest'" />

    <TabVideo v-for="category in categories" :key="category.id" v-if="activeCategory === category.title" :category="category.title" :categoryID="category.id" @updateCategory="setCategory" />

  </div>
</template>

<script>
import { db } from "../main";
import TabVideo from "../components/TabVideo";

export default {
  name: "Dashboard",
  components: { TabVideo },
  data() {
    return {
      categories: [],
      activeCategory: "Newest"
    };
  },
  firestore() {
    return {
      categories: db.collection("categories")
    };
  },
  methods: {
    setCategory(category) {
      this.activeCategory = category;
    }
  }
};
</script>
