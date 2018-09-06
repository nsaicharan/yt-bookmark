<template>
    <div>
      <h1 class="title">Dashboard</h1>

      <div class="tabs">
        <ul>
          <li :class="{'is-active': activeCategory === 'Newest'}">
            <a href="#" @click="setCategory('Newest')">Newest</a>
          </li>

          <li 
            :class="{'is-active': activeCategory === category.title}"
            v-for="category in categories" 
            :key="category.title"
          >
            <a href="#" @click="setCategory(category.title)">{{category.title}}</a>
          </li>  
        </ul>  
      </div>    
    </div>           
</template>

<script>
import { db } from "../main";

export default {
  name: "Dashboard",
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
