<template>
  <section>
    <h2>Recipe Graph</h2>
    <RecipeGraph :items="items" :recipes="recipes"/>
  </section>
</template>

<script>
export default {
  name: 'SophieRecipeGraphPage'
}
</script>

<script setup>
import items from '@/assets/databases/sophie2/items.json'
import recipes from '@/assets/databases/sophie2/recipes.json'
import RecipeGraph from '@/components/RecipeGraph.vue'
</script>